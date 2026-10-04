const db = require("../config/db");

// ================= GET BALANCE =================

const getBalance = (req, res) => {
  const userId = req.user.userId;

  const query = `
    SELECT id, balance
    FROM accounts
    WHERE user_id = ?
  `;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.log("Something error to fetch the balance", err);

      return res.status(500).json({
        message: "Unable to fetch balance.",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Trading account not found",
      });
    }

    return res.status(200).json({
      message: "Balance fetched successfully!!",
      accountId: result[0].id,
      balance: result[0].balance,
    });
  });
};


// ================= DEPOSIT FUNDS =================

const depositFuds = (req, res) => {
  const userId = req.user.userId;
  const { amount } = req.body;

  // Joi has already validated the amount
  const depositAmount = amount;

  // 1. Begin transaction
  db.beginTransaction((err) => {
    if (err) {
      console.log("Transaction start error", err);

      return res.status(500).json({
        message: "Something went wrong.",
      });
    }

    // 2. Update account balance
    const updateBalanceQuery = `
      UPDATE accounts
      SET balance = balance + ?
      WHERE user_id = ?
    `;

    db.query(
      updateBalanceQuery,
      [depositAmount, userId],
      (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.log("Balance update error:", err);

            return res.status(500).json({
              message: "Unable to deposit funds",
            });
          });
        }

        // 3. Account not found
        if (result.affectedRows === 0) {
          return db.rollback(() => {
            return res.status(404).json({
              message: "Trading account not found",
            });
          });
        }

        // 4. Create transaction record
        const transactionQuery = `
          INSERT INTO transactions
          (user_id, type, amount, description)
          VALUES (?, 'DEPOSIT', ?, ?)
        `;

        db.query(
          transactionQuery,
          [
            userId,
            depositAmount,
            "Funds deposited into trading account",
          ],
          (err, transactionResult) => {
            if (err) {
              return db.rollback(() => {
                console.log("Transaction record error:", err);

                return res.status(500).json({
                  message: "Unable to record deposit",
                });
              });
            }

            // 5. Commit transaction
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  console.log("Commit error", err);

                  return res.status(500).json({
                    message: "Deposit failed!!",
                  });
                });
              }

              return res.status(200).json({
                message: "Fund deposited!!",
                amount: depositAmount,
                transactionId: transactionResult.insertId,
              });
            });
          }
        );
      }
    );
  });
};


// ================= WITHDRAW FUNDS =================

const withdrawFunds = (req, res) => {
  const userId = req.user.userId;
  const { amount } = req.body;

  // Joi has already validated the amount
  const withdrawalAmount = amount;

  // 1. Start transaction
  db.beginTransaction((err) => {
    if (err) {
      console.log("Transaction start error:", err);

      return res.status(500).json({
        message: "Something went wrong",
      });
    }

    // 2. Get current balance
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
            console.log("Balance fetch error:", err);

            return res.status(500).json({
              message: "Unable to check account balance",
            });
          });
        }

        // 3. Account not found
        if (results.length === 0) {
          return db.rollback(() => {
            return res.status(404).json({
              message: "Trading account not found",
            });
          });
        }

        const account = results[0];
        const currentBalance = Number(account.balance);

        // 4. Business rule:
        // Check sufficient balance
        if (withdrawalAmount > currentBalance) {
          return db.rollback(() => {
            return res.status(400).json({
              message: "Insufficient balance",
              availableBalance: currentBalance,
            });
          });
        }

        // 5. Update balance
        const updateBalanceQuery = `
          UPDATE accounts
          SET balance = balance - ?
          WHERE user_id = ?
        `;

        db.query(
          updateBalanceQuery,
          [withdrawalAmount, userId],
          (err) => {
            if (err) {
              return db.rollback(() => {
                console.log("Balance update error:", err);

                return res.status(500).json({
                  message: "Unable to withdraw funds",
                });
              });
            }

            // 6. Create transaction record
            const transactionQuery = `
              INSERT INTO transactions
              (user_id, type, amount, description)
              VALUES (?, 'WITHDRAW', ?, ?)
            `;

            db.query(
              transactionQuery,
              [
                userId,
                withdrawalAmount,
                "Funds withdrawn from trading account",
              ],
              (err, transactionResult) => {
                if (err) {
                  return db.rollback(() => {
                    console.log(
                      "Transaction record error:",
                      err
                    );

                    return res.status(500).json({
                      message: "Unable to record withdrawal",
                    });
                  });
                }

                // 7. Commit transaction
                db.commit((err) => {
                  if (err) {
                    return db.rollback(() => {
                      console.log("Commit error:", err);

                      return res.status(500).json({
                        message: "Withdrawal failed",
                      });
                    });
                  }

                  return res.status(200).json({
                    message: "Funds withdrawn successfully",
                    amount: withdrawalAmount,
                    remainingBalance:
                      currentBalance - withdrawalAmount,
                    transactionId:
                      transactionResult.insertId,
                  });
                });
              }
            );
          }
        );
      }
    );
  });
};

// ================= transaction history =============

const getTransactions = (req, res) => {
  const userId = req.user.userId;
  const query = `SELECT 
  id,
  type,
  amount,
  reference_id,
  description,
  created_at
FROM transactions
WHERE user_id = ?
ORDER BY created_at DESC
`;

db.query(query, [userId], (error, results)=>{
  if (error) {
    console.error("Get transactions error:", error);
    return res.status(500).json({
      message: "Failed to fetch transactions",
    });
  }
  return res.status(200).json({
    message: "Transactions fetched successfully",
    transactions: results,
  });
});

}
module.exports = {
  getBalance,
  depositFuds,
  withdrawFunds,
  getTransactions
};