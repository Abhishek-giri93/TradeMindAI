const db = require("../config/db");
const { getStockQuote } = require("./marketService");

// =====================================================
// COMMON VALIDATION
// =====================================================

const validateOrderInput = (
  stockSymbol,
  quantity,
  callback
) => {
  // -----------------------------------------------------
  // STOCK SYMBOL
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
  // QUANTITY
  // -----------------------------------------------------

  const parsedQuantity = Number(quantity);

  if (
    !Number.isInteger(parsedQuantity) ||
    parsedQuantity <= 0
  ) {
    return callback({
      type: "INVALID_QUANTITY",
      message:
        "Quantity must be a positive whole number",
    });
  }

  return callback(null, {
    symbol,
    quantity: parsedQuantity,
  });
};


// =====================================================
// EXECUTE BUY ORDER
// =====================================================

const executeBuyOrder = (
  userId,
  symbol,
  quantity,
  marketPrice,
  totalAmount,
  orderId,
  callback
) => {

  // -----------------------------------------------------
  // START TRANSACTION
  // -----------------------------------------------------

  db.beginTransaction((err) => {

    if (err) {
      console.log(
        "BUY transaction start error:",
        err
      );

      return callback(err);
    }

    // -----------------------------------------------------
    // LOCK ACCOUNT
    // -----------------------------------------------------

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
            console.log(
              "BUY balance fetch error:",
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
              message:
                "Trading account not found",
            });

          });
        }

        const account = results[0];

        const currentBalance =
          Number(account.balance);

        // -------------------------------------------------
        // CHECK BALANCE
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

                console.log(
                  "BUY balance update error:",
                  err
                );

                return callback(err);

              });
            }

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

            // -------------------------------------------------
            // LOCK HOLDING
            // -------------------------------------------------

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

                    console.log(
                      "BUY holding fetch error:",
                      err
                    );

                    return callback(err);

                  });
                }

                // =================================================
                // CREATE NEW HOLDING
                // =================================================

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
                      quantity,
                      marketPrice,
                    ],
                    (err, holdingResult) => {

                      if (err) {

                        return db.rollback(() => {

                          console.log(
                            "BUY holding creation error:",
                            err
                          );

                          return callback(err);

                        });
                      }

                      if (
                        holdingResult.affectedRows !==
                        1
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

                // =================================================
                // UPDATE EXISTING HOLDING
                // =================================================

                const holding =
                  holdingResults[0];

                const oldQuantity =
                  Number(
                    holding.quantity
                  );

                const oldAveragePrice =
                  Number(
                    holding.average_price
                  );

                const newQuantity =
                  oldQuantity + quantity;

                const newAveragePrice =
                  (
                    (
                      oldQuantity *
                      oldAveragePrice
                    ) +
                    (
                      quantity *
                      marketPrice
                    )
                  ) / newQuantity;

                const roundedAveragePrice =
                  Number(
                    newAveragePrice.toFixed(2)
                  );

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

                        console.log(
                          "BUY holding update error:",
                          err
                        );

                        return callback(err);

                      });
                    }

                    if (
                      holdingResult.affectedRows !==
                      1
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

                // =================================================
                // CREATE BUY TRANSACTION
                // =================================================

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
                      `BUY ${quantity} ${symbol}`,
                    ],
                    (err, transactionResult) => {

                      if (err) {

                        return db.rollback(() => {

                          console.log(
                            "BUY transaction creation error:",
                            err
                          );

                          return callback(err);

                        });
                      }

                      // -------------------------------------------------
                      // PENDING → COMPLETED
                      // -------------------------------------------------

                      const completeOrderQuery = `
                        UPDATE orders
                        SET status = 'Completed'
                        WHERE id = ?
                          AND user_id = ?
                          AND status = 'Pending'
                      `;

                      db.query(
                        completeOrderQuery,
                        [
                          orderId,
                          userId,
                        ],
                        (err, orderResult) => {

                          if (err) {

                            return db.rollback(() => {

                              console.log(
                                "BUY order completion error:",
                                err
                              );

                              return callback(err);

                            });
                          }

                          if (
                            orderResult.affectedRows !==
                            1
                          ) {

                            return db.rollback(() => {

                              return callback({
                                type:
                                  "ORDER_COMPLETION_FAILED",
                                message:
                                  "Unable to complete pending order",
                              });

                            });
                          }

                          // -------------------------------------------------
                          // COMMIT
                          // -------------------------------------------------

                          db.commit((err) => {

                            if (err) {

                              return db.rollback(() => {

                                console.log(
                                  "BUY commit error:",
                                  err
                                );

                                return callback(err);

                              });
                            }

                            // -------------------------------------------------
                            // SUCCESS
                            // -------------------------------------------------

                            return callback(
                              null,
                              {
                                orderId,

                                transactionId:
                                  transactionResult.insertId,

                                stockSymbol:
                                  symbol,

                                quantity,

                                marketPrice,

                                totalAmount,

                                remainingBalance:
                                  Number(
                                    (
                                      currentBalance -
                                      totalAmount
                                    ).toFixed(2)
                                  ),

                                status:
                                  "Completed",
                              }
                            );
                          });
                        }
                      );
                    }
                  );
                }
              }
            );
          }
        );
      }
    );
  });
};


// =====================================================
// PLACE BUY ORDER
// =====================================================

const placeBuyOrderService = async (
  userId,
  stockSymbol,
  quantity,
  callback
) => {

  validateOrderInput(
    stockSymbol,
    quantity,
    async (
      validationError,
      validatedData
    ) => {

      if (validationError) {
        return callback(
          validationError
        );
      }

      const {
        symbol,
        quantity,
      } = validatedData;

      // -----------------------------------------------------
      // GET MARKET PRICE
      // -----------------------------------------------------

      let marketPrice;
      let totalAmount;

      try {

        const quote =
          await getStockQuote(symbol);

        marketPrice =
          Number(
            quote.last_price
          );

        if (
          !Number.isFinite(
            marketPrice
          ) ||
          marketPrice <= 0
        ) {

          return callback({
            type:
              "INVALID_MARKET_PRICE",
            message:
              "Unable to get a valid market price",
          });
        }

        totalAmount =
          Number(
            (
              quantity *
              marketPrice
            ).toFixed(2)
          );

      } catch (error) {

        console.log(
          "BUY market price error:",
          error
        );

        return callback(error);
      }

      // -----------------------------------------------------
      // CREATE PENDING ORDER
      // -----------------------------------------------------

      const pendingOrderQuery = `
        INSERT INTO orders
        (
          user_id,
          order_type,
          stock_symbol,
          quantity,
          price,
          status
        )
        VALUES (?, 'BUY', ?, ?, ?, 'Pending')
      `;

      db.query(
        pendingOrderQuery,
        [
          userId,
          symbol,
          quantity,
          marketPrice,
        ],
        (err, orderResult) => {

          if (err) {

            console.log(
              "BUY pending order creation error:",
              err
            );

            return callback(err);
          }

          const orderId =
            orderResult.insertId;

          // -------------------------------------------------
          // EXECUTE ORDER
          // -------------------------------------------------

          executeBuyOrder(
            userId,
            symbol,
            quantity,
            marketPrice,
            totalAmount,
            orderId,
            (executionError, result) => {

              if (executionError) {

                // ---------------------------------------------
                // PENDING → CANCELLED
                // ---------------------------------------------

                const cancelOrderQuery = `
                  UPDATE orders
                  SET status = 'Cancelled'
                  WHERE id = ?
                    AND user_id = ?
                    AND status = 'Pending'
                `;

                return db.query(
                  cancelOrderQuery,
                  [
                    orderId,
                    userId,
                  ],
                  (cancelError) => {

                    if (cancelError) {

                      console.log(
                        "BUY cancellation error:",
                        cancelError
                      );
                    }

                    return callback(
                      executionError
                    );
                  }
                );
              }

              return callback(
                null,
                result
              );
            }
          );
        }
      );
    }
  );
};


// =====================================================
// PLACE SELL ORDER
// =====================================================

const placeSellOrderService = async (
  userId,
  stockSymbol,
  quantity,
  callback
) => {

  validateOrderInput(
    stockSymbol,
    quantity,
    async (
      validationError,
      validatedData
    ) => {

      if (validationError) {
        return callback(
          validationError
        );
      }

      const {
        symbol,
        quantity,
      } = validatedData;

      // -----------------------------------------------------
      // GET MARKET PRICE
      // -----------------------------------------------------

      let marketPrice;
      let totalAmount;

      try {

        const quote =
          await getStockQuote(symbol);

        marketPrice =
          Number(
            quote.last_price
          );

        if (
          !Number.isFinite(
            marketPrice
          ) ||
          marketPrice <= 0
        ) {

          return callback({
            type:
              "INVALID_MARKET_PRICE",
            message:
              "Unable to get a valid market price",
          });
        }

        totalAmount =
          Number(
            (
              quantity *
              marketPrice
            ).toFixed(2)
          );

      } catch (error) {

        console.log(
          "SELL market price error:",
          error
        );

        return callback(error);
      }

      // -----------------------------------------------------
      // CREATE PENDING SELL ORDER
      // -----------------------------------------------------

      const pendingOrderQuery = `
        INSERT INTO orders
        (
          user_id,
          order_type,
          stock_symbol,
          quantity,
          price,
          status
        )
        VALUES (?, 'SELL', ?, ?, ?, 'Pending')
      `;

      db.query(
        pendingOrderQuery,
        [
          userId,
          symbol,
          quantity,
          marketPrice,
        ],
        (err, orderResult) => {

          if (err) {

            console.log(
              "SELL pending order creation error:",
              err
            );

            return callback(err);
          }

          const orderId =
            orderResult.insertId;

          executeSellOrder(
            userId,
            symbol,
            quantity,
            marketPrice,
            totalAmount,
            orderId,
            (executionError, result) => {

              if (executionError) {

                // ---------------------------------------------
                // PENDING → CANCELLED
                // ---------------------------------------------

                const cancelOrderQuery = `
                  UPDATE orders
                  SET status = 'Cancelled'
                  WHERE id = ?
                    AND user_id = ?
                    AND status = 'Pending'
                `;

                return db.query(
                  cancelOrderQuery,
                  [
                    orderId,
                    userId,
                  ],
                  (cancelError) => {

                    if (cancelError) {

                      console.log(
                        "SELL cancellation error:",
                        cancelError
                      );
                    }

                    return callback(
                      executionError
                    );
                  }
                );
              }

              return callback(
                null,
                result
              );
            }
          );
        }
      );
    }
  );
};


// =====================================================
// EXECUTE SELL ORDER
// =====================================================

const executeSellOrder = (
  userId,
  symbol,
  quantity,
  marketPrice,
  totalAmount,
  orderId,
  callback
) => {

  // -----------------------------------------------------
  // START TRANSACTION
  // -----------------------------------------------------

  db.beginTransaction((err) => {

    if (err) {

      console.log(
        "SELL transaction start error:",
        err
      );

      return callback(err);
    }

    // -----------------------------------------------------
    // LOCK ACCOUNT
    // -----------------------------------------------------

    const accountQuery = `
      SELECT id, balance
      FROM accounts
      WHERE user_id = ?
      FOR UPDATE
    `;

    db.query(
      accountQuery,
      [userId],
      (err, accountResults) => {

        if (err) {

          return db.rollback(() => {

            console.log(
              "SELL account fetch error:",
              err
            );

            return callback(err);

          });
        }

        // -------------------------------------------------
        // ACCOUNT NOT FOUND
        // -------------------------------------------------

        if (
          accountResults.length === 0
        ) {

          return db.rollback(() => {

            return callback({
              type:
                "ACCOUNT_NOT_FOUND",
              message:
                "Trading account not found",
            });

          });
        }

        // -------------------------------------------------
        // LOCK HOLDING
        // -------------------------------------------------

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

                console.log(
                  "SELL holding fetch error:",
                  err
                );

                return callback(err);

              });
            }

            // -------------------------------------------------
            // HOLDING NOT FOUND
            // -------------------------------------------------

            if (
              holdingResults.length === 0
            ) {

              return db.rollback(() => {

                return callback({
                  type:
                    "HOLDING_NOT_FOUND",
                  message:
                    `No holding found for ${symbol}`,
                });

              });
            }

            const holding =
              holdingResults[0];

            const availableQuantity =
              Number(
                holding.quantity
              );

            // -------------------------------------------------
            // CHECK QUANTITY
            // -------------------------------------------------

            if (
              quantity >
              availableQuantity
            ) {

              return db.rollback(() => {

                return callback({
                  type:
                    "INSUFFICIENT_QUANTITY",

                  message:
                    "Insufficient stock quantity",

                  availableQuantity,

                  requestedQuantity:
                    quantity,
                });

              });
            }

            const newQuantity =
              availableQuantity -
              quantity;

            // -------------------------------------------------
            // UPDATE / DELETE HOLDING
            // -------------------------------------------------

            const handleHoldingUpdate =
              (holdingCallback) => {

                // ---------------------------------------------
                // SOME SHARES REMAIN
                // ---------------------------------------------

                if (
                  newQuantity > 0
                ) {

                  const updateHoldingQuery = `
                    UPDATE holdings
                    SET quantity = ?
                    WHERE id = ?
                  `;

                  return db.query(
                    updateHoldingQuery,
                    [
                      newQuantity,
                      holding.id,
                    ],
                    (err, holdingResult) => {

                      if (err) {
                        return holdingCallback(
                          err
                        );
                      }

                      if (
                        holdingResult.affectedRows !==
                        1
                      ) {

                        return holdingCallback({
                          type:
                            "HOLDING_UPDATE_FAILED",
                          message:
                            "Unable to update holding",
                        });
                      }

                      return holdingCallback(
                        null
                      );
                    }
                  );
                }

                // ---------------------------------------------
                // ALL SHARES SOLD
                // ---------------------------------------------

                const deleteHoldingQuery = `
                  DELETE FROM holdings
                  WHERE id = ?
                `;

                db.query(
                  deleteHoldingQuery,
                  [holding.id],
                  (err, holdingResult) => {

                    if (err) {
                      return holdingCallback(
                        err
                      );
                    }

                    if (
                      holdingResult.affectedRows !==
                      1
                    ) {

                      return holdingCallback({
                        type:
                          "HOLDING_DELETE_FAILED",
                        message:
                          "Unable to delete holding",
                      });
                    }

                    return holdingCallback(
                      null
                    );
                  }
                );
              };

            handleHoldingUpdate(
              (err) => {

                if (err) {

                  return db.rollback(() => {

                    console.log(
                      "SELL holding update failed:",
                      err
                    );

                    return callback(err);

                  });
                }

                // -------------------------------------------------
                // CREDIT ACCOUNT
                // -------------------------------------------------

                const updateBalanceQuery = `
                  UPDATE accounts
                  SET balance = balance + ?
                  WHERE user_id = ?
                `;

                db.query(
                  updateBalanceQuery,
                  [
                    totalAmount,
                    userId,
                  ],
                  (err, balanceResult) => {

                    if (err) {

                      return db.rollback(() => {

                        console.log(
                          "SELL balance update error:",
                          err
                        );

                        return callback(err);

                      });
                    }

                    if (
                      balanceResult.affectedRows !==
                      1
                    ) {

                      return db.rollback(() => {

                        return callback({
                          type:
                            "BALANCE_UPDATE_FAILED",
                          message:
                            "Unable to credit account balance",
                        });

                      });
                    }

                    // -------------------------------------------------
                    // CREATE SELL TRANSACTION
                    // -------------------------------------------------

                    const transactionQuery = `
                      INSERT INTO transactions
                      (
                        user_id,
                        type,
                        amount,
                        reference_id,
                        description
                      )
                      VALUES (?, 'SELL', ?, ?, ?)
                    `;

                    db.query(
                      transactionQuery,
                      [
                        userId,
                        totalAmount,
                        orderId,
                        `SELL ${quantity} ${symbol}`,
                      ],
                      (err, transactionResult) => {

                        if (err) {

                          return db.rollback(() => {

                            console.log(
                              "SELL transaction creation error:",
                              err
                            );

                            return callback(err);

                          });
                        }

                        // -------------------------------------------------
                        // PENDING → COMPLETED
                        // -------------------------------------------------

                        const completeOrderQuery = `
                          UPDATE orders
                          SET status = 'Completed'
                          WHERE id = ?
                            AND user_id = ?
                            AND status = 'Pending'
                        `;

                        db.query(
                          completeOrderQuery,
                          [
                            orderId,
                            userId,
                          ],
                          (err, orderResult) => {

                            if (err) {

                              return db.rollback(() => {

                                console.log(
                                  "SELL order completion error:",
                                  err
                                );

                                return callback(err);

                              });
                            }

                            if (
                              orderResult.affectedRows !==
                              1
                            ) {

                              return db.rollback(() => {

                                return callback({
                                  type:
                                    "ORDER_COMPLETION_FAILED",
                                  message:
                                    "Unable to complete pending order",
                                });

                              });
                            }

                            // -------------------------------------------------
                            // COMMIT
                            // -------------------------------------------------

                            db.commit(
                              (err) => {

                                if (err) {

                                  return db.rollback(
                                    () => {

                                      console.log(
                                        "SELL commit error:",
                                        err
                                      );

                                      return callback(
                                        err
                                      );

                                    }
                                  );
                                }

                                // -------------------------------------------------
                                // SUCCESS
                                // -------------------------------------------------

                                return callback(
                                  null,
                                  {
                                    orderId,

                                    transactionId:
                                      transactionResult.insertId,

                                    stockSymbol:
                                      symbol,

                                    quantity,

                                    marketPrice,

                                    totalAmount,

                                    remainingQuantity:
                                      newQuantity,

                                    status:
                                      "Completed",
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
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


// =====================================================
// CANCEL ORDER
// =====================================================

const cancelOrderService = (
  userId,
  orderId,
  callback
) => {

  const parsedOrderId =
    Number(orderId);

  // -----------------------------------------------------
  // VALIDATE ORDER ID
  // -----------------------------------------------------

  if (
    !Number.isInteger(
      parsedOrderId
    ) ||
    parsedOrderId <= 0
  ) {

    return callback({
      type:
        "INVALID_ORDER_ID",
      message:
        "Invalid order ID",
    });
  }

  // -----------------------------------------------------
  // CANCEL ONLY PENDING ORDER
  // -----------------------------------------------------

  const cancelOrderQuery = `
    UPDATE orders
    SET status = 'Cancelled'
    WHERE id = ?
      AND user_id = ?
      AND status = 'Pending'
  `;

  db.query(
    cancelOrderQuery,
    [
      parsedOrderId,
      userId,
    ],
    (err, result) => {

      if (err) {

        console.log(
          "Order cancellation error:",
          err
        );

        return callback(err);
      }

      if (
        result.affectedRows !== 1
      ) {

        return callback({
          type:
            "ORDER_NOT_CANCELLABLE",

          message:
            "Order not found or order is not pending",
        });
      }

      return callback(
        null,
        {
          orderId:
            parsedOrderId,

          status:
            "Cancelled",
        }
      );
    }
  );
};


// =====================================================
// GET USER ORDERS
// =====================================================

const getOrderService = (
  userId,
  callback
) => {

  const ordersQuery = `
    SELECT
      id,
      order_type,
      stock_symbol,
      quantity,
      price,
      status,
      created_at
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(
    ordersQuery,
    [userId],
    (err, orderResults) => {

      if (err) {

        console.log(
          "Order fetch failed:",
          err
        );

        return callback(err);
      }

      return callback(
        null,
        orderResults
      );
    }
  );
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  placeBuyOrderService,
  placeSellOrderService,
  getOrderService,
  cancelOrderService,
};