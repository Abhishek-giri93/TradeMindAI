const db = require("../config/db");

// ================= GET TRANSACTIONS =================

const getTransactionsService = (userId, callback) => {
  const query = `
    SELECT
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

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.log("Transaction history fetch error:", err);
      return callback(err);
    }

    return callback(null, result);
  });
};

module.exports = {
  getTransactionsService
};