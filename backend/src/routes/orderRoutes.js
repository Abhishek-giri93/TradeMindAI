// =====================================================
// ORDER CONTROLLER
// =====================================================

const db = require("../config/db");
const { getStockQuote } = require("../services/stockService");


// =====================================================
// HELPER: SEND ERROR RESPONSE
// =====================================================

const sendError = (res, error) => {

  console.error("Order Controller Error:", error);

  const statusMap = {
    INVALID_STOCK_SYMBOL: 400,
    INVALID_QUANTITY: 400,
    INVALID_ORDER_ID: 400,
    MARKET_DATA_ERROR: 502,
    ACCOUNT_NOT_FOUND: 404,
    INSUFFICIENT_BALANCE: 400,
    HOLDING_NOT_FOUND: 404,
    INSUFFICIENT_HOLDING: 400,
    ORDER_NOT_FOUND: 404,
    ORDER_NOT_CANCELLABLE: 400,
    BALANCE_UPDATE_FAILED: 500,
    HOLDING_UPDATE_FAILED: 500,
    HOLDING_CREATION_FAILED: 500,
  };

  const statusCode =
    statusMap[error?.type] || 500;

  return res.status(statusCode).json({
    success: false,
    error: {
      type:
        error?.type ||
        "INTERNAL_SERVER_ERROR",

      message:
        error?.message ||
        "Something went wrong",
    },
  });
};


// =====================================================
// PLACE BUY ORDER
// =====================================================

const placeBuyOrder = async (req, res) => {

  const userId = req.user.id;

  const {
    stockSymbol,
    quantity,
  } = req.body;


  // -----------------------------------------------------
  // VALIDATE STOCK SYMBOL
  // -----------------------------------------------------

  if (
    !stockSymbol ||
    typeof stockSymbol !== "string"
  ) {
    return sendError(res, {
      type: "INVALID_STOCK_SYMBOL",
      message: "Invalid stock symbol",
    });
  }

  const symbol =
    stockSymbol
      .trim()
      .toUpperCase();


  if (!symbol) {

    return sendError(res, {
      type: "INVALID_STOCK_SYMBOL",
      message: "Stock symbol cannot be empty",
    });
  }


  // -----------------------------------------------------
  // VALIDATE QUANTITY
  // -----------------------------------------------------

  const parsedQuantity =
    Number(quantity);


  if (
    !Number.isInteger(parsedQuantity) ||
    parsedQuantity <= 0
  ) {

    return sendError(res, {
      type: "INVALID_QUANTITY",
      message:
        "Quantity must be a positive whole number",
    });
  }


  // -----------------------------------------------------
  // GET MARKET PRICE
  // -----------------------------------------------------

  let marketPrice;
  let totalAmount;


  try {

    const quote =
      await getStockQuote(symbol);

    marketPrice =
      Number(quote.last_price);


    if (
      !Number.isFinite(marketPrice) ||
      marketPrice <= 0
    ) {

      return sendError(res, {
        type: "MARKET_DATA_ERROR",
        message:
          "Invalid market price",
      });
    }


    totalAmount =
      Number(
        (
          parsedQuantity *
          marketPrice
        ).toFixed(2)
      );

  } catch (error) {

    console.error(
      "Market price fetch error:",
      error
    );

    return sendError(res, {
      type: "MARKET_DATA_ERROR",
      message:
        "Unable to fetch current market price.",
    });
  }


  // -----------------------------------------------------
  // START TRANSACTION
  // -----------------------------------------------------

  db.beginTransaction((err) => {

    if (err) {

      console.error(
        "Transaction start error:",
        err
      );

      return sendError(res, err);
    }


    // ---------------------------------------------------
    // LOCK ACCOUNT
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

            return sendError(res, err);
          });
        }


        // -------------------------------------------------
        // ACCOUNT NOT FOUND
        // -------------------------------------------------

        if (
          results.length === 0
        ) {

          return db.rollback(() => {

            return sendError(res, {
              type:
                "ACCOUNT_NOT_FOUND",

              message:
                "Trading account not found",
            });
          });
        }


        const account =
          results[0];


        const currentBalance =
          Number(account.balance);


        // -------------------------------------------------
        // CHECK BALANCE
        // -------------------------------------------------

        if (
          totalAmount >
          currentBalance
        ) {

          return db.rollback(() => {

            return sendError(res, {
              type:
                "INSUFFICIENT_BALANCE",

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

                return sendError(res, err);
              });
            }


            if (
              balanceResult.affectedRows !== 1
            ) {

              return db.rollback(() => {

                return sendError(res, {
                  type:
                    "BALANCE_UPDATE_FAILED",

                  message:
                    "Unable to deduct balance",
                });
              });
            }


            // -------------------------------------------------
            // CREATE ORDER
            // -------------------------------------------------

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

                    return sendError(res, err);
                  });
                }


                const orderId =
                  orderResult.insertId;


                // -------------------------------------------------
                // FIND + LOCK HOLDING
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

                        console.error(
                          "Holding fetch error:",
                          err
                        );

                        return sendError(
                          res,
                          err
                        );
                      });
                    }


                    // =============================================
                    // CREATE NEW HOLDING
                    // =============================================

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

                              return sendError(
                                res,
                                err
                              );
                            });
                          }


                          if (
                            holdingResult.affectedRows !== 1
                          ) {

                            return db.rollback(() => {

                              return sendError(res, {
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


                    // =============================================
                    // EXISTING HOLDING
                    // =============================================

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
                      oldQuantity +
                      parsedQuantity;


                    // -------------------------------------------------
                    // NEW AVERAGE PRICE
                    // -------------------------------------------------

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


                    // -------------------------------------------------
                    // UPDATE HOLDING
                    // -------------------------------------------------

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

                            return sendError(
                              res,
                              err
                            );
                          });
                        }


                        if (
                          holdingResult.affectedRows !== 1
                        ) {

                          return db.rollback(() => {

                            return sendError(res, {
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


                    // =============================================
                    // CREATE BUY TRANSACTION
                    // =============================================

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

                              return sendError(
                                res,
                                err
                              );
                            });
                          }


                          // -------------------------------------------------
                          // COMMIT
                          // -------------------------------------------------

                          db.commit((err) => {

                            if (err) {

                              return db.rollback(() => {

                                console.error(
                                  "Commit error:",
                                  err
                                );

                                return sendError(
                                  res,
                                  err
                                );
                              });
                            }


                            return res.status(201).json({
                              success: true,

                              message:
                                "Buy order placed successfully",

                              data: {
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
                              },
                            });
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


// =====================================================
// PLACE SELL ORDER
// =====================================================

const placeSellOrder = async (req, res) => {

  const userId =
    req.user.id;

  const {
    stockSymbol,
    quantity,
  } = req.body;


  // -----------------------------------------------------
  // VALIDATE STOCK
  // -----------------------------------------------------

  if (
    !stockSymbol ||
    typeof stockSymbol !== "string"
  ) {

    return sendError(res, {
      type:
        "INVALID_STOCK_SYMBOL",

      message:
        "Invalid stock symbol",
    });
  }


  const symbol =
    stockSymbol
      .trim()
      .toUpperCase();


  if (!symbol) {

    return sendError(res, {
      type:
        "INVALID_STOCK_SYMBOL",

      message:
        "Stock symbol cannot be empty",
    });
  }


  // -----------------------------------------------------
  // VALIDATE QUANTITY
  // -----------------------------------------------------

  const parsedQuantity =
    Number(quantity);


  if (
    !Number.isInteger(parsedQuantity) ||
    parsedQuantity <= 0
  ) {

    return sendError(res, {
      type:
        "INVALID_QUANTITY",

      message:
        "Quantity must be a positive whole number",
    });
  }


  // -----------------------------------------------------
  // GET MARKET PRICE
  // -----------------------------------------------------

  let marketPrice;
  let totalAmount;


  try {

    const quote =
      await getStockQuote(symbol);

    marketPrice =
      Number(quote.last_price);


    if (
      !Number.isFinite(marketPrice) ||
      marketPrice <= 0
    ) {

      return sendError(res, {
        type:
          "MARKET_DATA_ERROR",

        message:
          "Invalid market price",
      });
    }


    totalAmount =
      Number(
        (
          parsedQuantity *
          marketPrice
        ).toFixed(2)
      );

  } catch (error) {

    console.error(
      "Market price fetch error:",
      error
    );

    return sendError(res, {
      type:
        "MARKET_DATA_ERROR",

      message:
        "Unable to fetch current market price.",
    });
  }


  // -----------------------------------------------------
  // START TRANSACTION
  // -----------------------------------------------------

  db.beginTransaction((err) => {

    if (err) {

      return sendError(
        res,
        err
      );
    }


    // ---------------------------------------------------
    // LOCK HOLDING
    // ---------------------------------------------------

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

            return sendError(
              res,
              err
            );
          });
        }


        // -------------------------------------------------
        // HOLDING NOT FOUND
        // -------------------------------------------------

        if (
          holdingResults.length === 0
        ) {

          return db.rollback(() => {

            return sendError(res, {
              type:
                "HOLDING_NOT_FOUND",

              message:
                `You do not own ${symbol}`,
            });
          });
        }


        const holding =
          holdingResults[0];


        const currentQuantity =
          Number(
            holding.quantity
          );


        // -------------------------------------------------
        // CHECK QUANTITY
        // -------------------------------------------------

        if (
          parsedQuantity >
          currentQuantity
        ) {

          return db.rollback(() => {

            return sendError(res, {
              type:
                "INSUFFICIENT_HOLDING",

              message:
                `Insufficient ${symbol} quantity`,

              availableQuantity:
                currentQuantity,

              requestedQuantity:
                parsedQuantity,
            });
          });
        }


        const newQuantity =
          currentQuantity -
          parsedQuantity;


        // -------------------------------------------------
        // CREATE SELL ORDER
        // -------------------------------------------------

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
            'SELL',
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

                return sendError(
                  res,
                  err
                );
              });
            }


            const orderId =
              orderResult.insertId;


            // -------------------------------------------------
            // UPDATE HOLDING
            // -------------------------------------------------

            if (
              newQuantity === 0
            ) {

              const deleteHoldingQuery = `
                DELETE FROM holdings
                WHERE id = ?
              `;


              db.query(
                deleteHoldingQuery,
                [holding.id],
                (err, result) => {

                  if (err) {

                    return db.rollback(() => {

                      return sendError(
                        res,
                        err
                      );
                    });
                  }


                  if (
                    result.affectedRows !== 1
                  ) {

                    return db.rollback(() => {

                      return sendError(res, {
                        type:
                          "HOLDING_UPDATE_FAILED",

                        message:
                          "Unable to close holding",
                      });
                    });
                  }


                  completeSellOrder();
                }
              );

            } else {

              const updateHoldingQuery = `
                UPDATE holdings
                SET quantity = ?
                WHERE id = ?
              `;


              db.query(
                updateHoldingQuery,
                [
                  newQuantity,
                  holding.id,
                ],
                (err, result) => {

                  if (err) {

                    return db.rollback(() => {

                      return sendError(
                        res,
                        err
                      );
                    });
                  }


                  if (
                    result.affectedRows !== 1
                  ) {

                    return db.rollback(() => {

                      return sendError(res, {
                        type:
                          "HOLDING_UPDATE_FAILED",

                        message:
                          "Unable to update holding",
                      });
                    });
                  }


                  completeSellOrder();
                }
              );
            }


            // -------------------------------------------------
            // COMPLETE SELL ORDER
            // -------------------------------------------------

            function completeSellOrder() {

              // -----------------------------------------------
              // CREDIT ACCOUNT
              // -----------------------------------------------

              const creditBalanceQuery = `
                UPDATE accounts
                SET balance = balance + ?
                WHERE user_id = ?
              `;


              db.query(
                creditBalanceQuery,
                [
                  totalAmount,
                  userId,
                ],
                (err, balanceResult) => {

                  if (err) {

                    return db.rollback(() => {

                      return sendError(
                        res,
                        err
                      );
                    });
                  }


                  if (
                    balanceResult.affectedRows !== 1
                  ) {

                    return db.rollback(() => {

                      return sendError(res, {
                        type:
                          "BALANCE_UPDATE_FAILED",

                        message:
                          "Unable to credit account balance",
                      });
                    });
                  }


                  // ---------------------------------------------
                  // TRANSACTION RECORD
                  // ---------------------------------------------

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
                      `SELL ${parsedQuantity} ${symbol}`,
                    ],
                    (err, transactionResult) => {

                      if (err) {

                        return db.rollback(() => {

                          return sendError(
                            res,
                            err
                          );
                        });
                      }


                      // -------------------------------------------
                      // GET UPDATED BALANCE
                      // -------------------------------------------

                      const balanceQuery = `
                        SELECT balance
                        FROM accounts
                        WHERE user_id = ?
                      `;


                      db.query(
                        balanceQuery,
                        [userId],
                        (err, balanceResults) => {

                          if (err) {

                            return db.rollback(() => {

                              return sendError(
                                res,
                                err
                              );
                            });
                          }


                          const remainingBalance =
                            Number(
                              balanceResults[0].balance
                            );


                          // -----------------------------------------
                          // COMMIT
                          // -----------------------------------------

                          db.commit((err) => {

                            if (err) {

                              return db.rollback(() => {

                                return sendError(
                                  res,
                                  err
                                );
                              });
                            }


                            return res.status(201).json({
                              success: true,

                              message:
                                "Sell order placed successfully",

                              data: {
                                orderId,

                                transactionId:
                                  transactionResult.insertId,

                                stockSymbol:
                                  symbol,

                                quantity:
                                  parsedQuantity,

                                marketPrice,

                                totalAmount,

                                remainingBalance,
                              },
                            });
                          });
                        }
                      );
                    }
                  );
                }
              );
            }
          }
        );
      }
    );
  });
};


// =====================================================
// GET USER ORDERS
// =====================================================

const getOrders = (req, res) => {

  const userId =
    req.user.id;


  const query = `
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
    query,
    [userId],
    (err, results) => {

      if (err) {

        console.error(
          "Get orders error:",
          err
        );

        return res.status(500).json({
          success: false,

          error: {
            type:
              "ORDERS_FETCH_FAILED",

            message:
              "Unable to fetch orders",
          },
        });
      }


      return res.status(200).json({
        success: true,

        data: results,
      });
    }
  );
};


// =====================================================
// CANCEL ORDER
// =====================================================

const cancelOrder = (req, res) => {

  const userId =
    req.user.id;

  const orderId =
    Number(req.params.orderId);


  // -----------------------------------------------------
  // VALIDATE ORDER ID
  // -----------------------------------------------------

  if (
    !Number.isInteger(orderId) ||
    orderId <= 0
  ) {

    return sendError(res, {
      type:
        "INVALID_ORDER_ID",

      message:
        "Invalid order ID",
    });
  }


  // -----------------------------------------------------
  // FIND ORDER
  // -----------------------------------------------------

  const findOrderQuery = `
    SELECT
      id,
      order_type,
      stock_symbol,
      quantity,
      price,
      status
    FROM orders
    WHERE id = ?
      AND user_id = ?
    FOR UPDATE
  `;


  db.beginTransaction((err) => {

    if (err) {

      return sendError(
        res,
        err
      );
    }


    db.query(
      findOrderQuery,
      [
        orderId,
        userId,
      ],
      (err, results) => {

        if (err) {

          return db.rollback(() => {

            return sendError(
              res,
              err
            );
          });
        }


        if (
          results.length === 0
        ) {

          return db.rollback(() => {

            return sendError(res, {
              type:
                "ORDER_NOT_FOUND",

              message:
                "Order not found",
            });
          });
        }


        const order =
          results[0];


        // -------------------------------------------------
        // ONLY NON-COMPLETED ORDERS CAN BE CANCELLED
        // -------------------------------------------------

        if (
          order.status !== "Pending"
        ) {

          return db.rollback(() => {

            return sendError(res, {
              type:
                "ORDER_NOT_CANCELLABLE",

              message:
                "Only pending orders can be cancelled",
            });
          });
        }


        // -------------------------------------------------
        // UPDATE ORDER STATUS
        // -------------------------------------------------

        const updateQuery = `
          UPDATE orders
          SET status = 'Cancelled'
          WHERE id = ?
            AND user_id = ?
            AND status = 'Pending'
        `;


        db.query(
          updateQuery,
          [
            orderId,
            userId,
          ],
          (err, result) => {

            if (err) {

              return db.rollback(() => {

                return sendError(
                  res,
                  err
                );
              });
            }


            if (
              result.affectedRows !== 1
            ) {

              return db.rollback(() => {

                return sendError(res, {
                  type:
                    "ORDER_NOT_CANCELLABLE",

                  message:
                    "Order could not be cancelled",
                });
              });
            }


            // -------------------------------------------------
            // COMMIT
            // -------------------------------------------------

            db.commit((err) => {

              if (err) {

                return db.rollback(() => {

                  return sendError(
                    res,
                    err
                  );
                });
              }


              return res.status(200).json({
                success: true,

                message:
                  "Order cancelled successfully",

                data: {
                  orderId,

                  status:
                    "Cancelled",
                },
              });
            });
          }
        );
      }
    );
  });
};


// =====================================================
// EXPORT CONTROLLER
// =====================================================

module.exports = {
  placeBuyOrder,
  placeSellOrder,
  getOrders,
  cancelOrder,
};