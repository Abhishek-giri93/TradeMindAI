// =====================================================
// PLACE BUY ORDER
// =====================================================

const placeBuyOrderService = async (
  userId,
  stockSymbol,
  quantity,
  callback
) => {

  // -----------------------------------------------------
  // VALIDATE STOCK SYMBOL
  // -----------------------------------------------------

  if (
    !stockSymbol ||
    typeof stockSymbol !== "string"
  ) {
    return callback({
      type: "INVALID_STOCK_SYMBOL",
      message: "Invalid stock symbol",
    });
  }

  const symbol = stockSymbol
    .trim()
    .toUpperCase();

  if (!symbol) {
    return callback({
      type: "INVALID_STOCK_SYMBOL",
      message: "Stock symbol cannot be empty",
    });
  }

  // -----------------------------------------------------
  // VALIDATE QUANTITY
  // -----------------------------------------------------

  const parsedQuantity = Number(quantity);

  if (
    !Number.isInteger(parsedQuantity) ||
    parsedQuantity <= 0
  ) {
    return callback({
      type: "INVALID_QUANTITY",
      message: "Quantity must be a positive whole number",
    });
  }

  // -----------------------------------------------------
  // GET CURRENT MARKET PRICE
  // -----------------------------------------------------

  let marketPrice;
  let totalAmount;

  try {

    const quote = await getStockQuote(symbol);

    marketPrice = Number(
      quote.last_price
    );

    // ---------------------------------------------------
    // VALIDATE MARKET PRICE
    // ---------------------------------------------------

    if (
      !Number.isFinite(marketPrice) ||
      marketPrice <= 0
    ) {
      return callback({
        type: "MARKET_DATA_ERROR",
        message: "Invalid market price",
      });
    }

    // ---------------------------------------------------
    // CALCULATE TOTAL AMOUNT
    // ---------------------------------------------------

    totalAmount = Number(
      (
        parsedQuantity * marketPrice
      ).toFixed(2)
    );

  } catch (error) {

    console.error(
      "Market price fetch error:",
      error
    );

    return callback({
      type: "MARKET_DATA_ERROR",
      message: "Unable to fetch current market price.",
    });
  }

  // -----------------------------------------------------
  // START DATABASE TRANSACTION
  // -----------------------------------------------------

  db.beginTransaction((err) => {

    if (err) {

      console.error(
        "Transaction start error:",
        err
      );

      return callback(err);
    }

    // ---------------------------------------------------
    // CHECK + LOCK ACCOUNT
    // ---------------------------------------------------

    const balanceQuery = `
      SELECT id, balance
      FROM accounts
      WHERE user_id = ?
      FOR UPDATE
    `;

    db.query(
      balanceQuery,
      [userId],
      (err, results) => {

        if (err) {

          return db.rollback(() => {

            console.error(
              "Balance fetch error:",
              err
            );

            return callback(err);
          });
        }

        // -------------------------------------------------
        // ACCOUNT NOT FOUND
        // -------------------------------------------------

        if (results.length === 0) {

          return db.rollback(() => {

            return callback({
              type: "ACCOUNT_NOT_FOUND",
              message: "Trading account not found",
            });
          });
        }

        const account = results[0];

        const currentBalance =
          Number(account.balance);

        // -------------------------------------------------
        // CHECK SUFFICIENT BALANCE
        // -------------------------------------------------

        if (totalAmount > currentBalance) {

          return db.rollback(() => {

            return callback({
              type: "INSUFFICIENT_BALANCE",

              message:
                "Insufficient account balance",

              availableBalance:
                currentBalance,

              requiredAmount:
                totalAmount,
            });
          });
        }

        // -------------------------------------------------
        // DEDUCT BALANCE
        // -------------------------------------------------

        const updateBalanceQuery = `
          UPDATE accounts
          SET balance = balance - ?
          WHERE user_id = ?
            AND balance >= ?
        `;

        db.query(
          updateBalanceQuery,
          [
            totalAmount,
            userId,
            totalAmount,
          ],
          (err, balanceResult) => {

            if (err) {

              return db.rollback(() => {

                console.error(
                  "Balance update error:",
                  err
                );

                return callback(err);
              });
            }

            // ---------------------------------------------
            // VERIFY BALANCE UPDATE
            // ---------------------------------------------

            if (
              balanceResult.affectedRows !== 1
            ) {

              return db.rollback(() => {

                return callback({
                  type:
                    "BALANCE_UPDATE_FAILED",

                  message:
                    "Unable to deduct balance",
                });
              });
            }

            // ---------------------------------------------
            // CREATE BUY ORDER
            // ---------------------------------------------

            const orderQuery = `
              INSERT INTO orders
              (
                user_id,
                order_type,
                stock_symbol,
                quantity,
                price,
                status
              )
              VALUES
              (
                ?,
                'BUY',
                ?,
                ?,
                ?,
                'Completed'
              )
            `;

            db.query(
              orderQuery,
              [
                userId,
                symbol,
                parsedQuantity,
                marketPrice,
              ],
              (err, orderResult) => {

                if (err) {

                  return db.rollback(() => {

                    console.error(
                      "Order creation error:",
                      err
                    );

                    return callback(err);
                  });
                }

                const orderId =
                  orderResult.insertId;

                // -----------------------------------------
                // FIND + LOCK HOLDING
                // -----------------------------------------

                const holdingQuery = `
                  SELECT
                    id,
                    quantity,
                    average_price
                  FROM holdings
                  WHERE user_id = ?
                    AND stock_symbol = ?
                  FOR UPDATE
                `;

                db.query(
                  holdingQuery,
                  [
                    userId,
                    symbol,
                  ],
                  (err, holdingResults) => {

                    if (err) {

                      return db.rollback(() => {

                        console.error(
                          "Holding fetch error:",
                          err
                        );

                        return callback(err);
                      });
                    }

                    // =====================================
                    // CREATE NEW HOLDING
                    // =====================================

                    if (
                      holdingResults.length === 0
                    ) {

                      const insertHoldingQuery = `
                        INSERT INTO holdings
                        (
                          user_id,
                          stock_symbol,
                          quantity,
                          average_price
                        )
                        VALUES (?, ?, ?, ?)
                      `;

                      return db.query(
                        insertHoldingQuery,
                        [
                          userId,
                          symbol,
                          parsedQuantity,
                          marketPrice,
                        ],
                        (err, holdingResult) => {

                          if (err) {

                            return db.rollback(() => {

                              console.error(
                                "Holding creation error:",
                                err
                              );

                              return callback(err);
                            });
                          }

                          if (
                            holdingResult.affectedRows !== 1
                          ) {

                            return db.rollback(() => {

                              return callback({
                                type:
                                  "HOLDING_CREATION_FAILED",

                                message:
                                  "Unable to create holding",
                              });
                            });
                          }

                          createBuyTransaction();
                        }
                      );
                    }

                    // =====================================
                    // EXISTING HOLDING
                    // =====================================

                    const holding =
                      holdingResults[0];

                    const oldQuantity =
                      Number(holding.quantity);

                    const oldAveragePrice =
                      Number(
                        holding.average_price
                      );

                    const newQuantity =
                      oldQuantity +
                      parsedQuantity;

                    // -------------------------------------
                    // CALCULATE NEW AVERAGE PRICE
                    // -------------------------------------

                    const newAveragePrice =
                      (
                        (
                          oldQuantity *
                          oldAveragePrice
                        ) +
                        (
                          parsedQuantity *
                          marketPrice
                        )
                      ) /
                      newQuantity;

                    const roundedAveragePrice =
                      Number(
                        newAveragePrice.toFixed(4)
                      );

                    // -------------------------------------
                    // UPDATE HOLDING
                    // -------------------------------------

                    const updateHoldingQuery = `
                      UPDATE holdings
                      SET
                        quantity = ?,
                        average_price = ?
                      WHERE id = ?
                    `;

                    db.query(
                      updateHoldingQuery,
                      [
                        newQuantity,
                        roundedAveragePrice,
                        holding.id,
                      ],
                      (err, holdingResult) => {

                        if (err) {

                          return db.rollback(() => {

                            console.error(
                              "Holding update error:",
                              err
                            );

                            return callback(err);
                          });
                        }

                        if (
                          holdingResult.affectedRows !== 1
                        ) {

                          return db.rollback(() => {

                            return callback({
                              type:
                                "HOLDING_UPDATE_FAILED",

                              message:
                                "Unable to update holding",
                            });
                          });
                        }

                        createBuyTransaction();
                      }
                    );

                    // =====================================
                    // CREATE BUY TRANSACTION
                    // =====================================

                    function createBuyTransaction() {

                      const transactionQuery = `
                        INSERT INTO transactions
                        (
                          user_id,
                          type,
                          amount,
                          reference_id,
                          description
                        )
                        VALUES (?, 'BUY', ?, ?, ?)
                      `;

                      db.query(
                        transactionQuery,
                        [
                          userId,
                          totalAmount,
                          orderId,
                          `BUY ${parsedQuantity} ${symbol}`,
                        ],
                        (err, transactionResult) => {

                          if (err) {

                            return db.rollback(() => {

                              console.error(
                                "Transaction record error:",
                                err
                              );

                              return callback(err);
                            });
                          }

                          // ---------------------------------
                          // COMMIT TRANSACTION
                          // ---------------------------------

                          db.commit((err) => {

                            if (err) {

                              return db.rollback(() => {

                                console.error(
                                  "Commit error:",
                                  err
                                );

                                return callback(err);
                              });
                            }

                            // -------------------------------
                            // SUCCESS
                            // -------------------------------

                            return callback(
                              null,
                              {
                                orderId,

                                transactionId:
                                  transactionResult.insertId,

                                stockSymbol:
                                  symbol,

                                quantity:
                                  parsedQuantity,

                                marketPrice,

                                totalAmount,

                                remainingBalance:
                                  Number(
                                    (
                                      currentBalance -
                                      totalAmount
                                    ).toFixed(2)
                                  ),
                              }
                            );
                          });
                        }
                      );
                    }
                  }
                );
              }
            );
          }
        );
      }
    );
  });
};