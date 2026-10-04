const db = require("../config/db");


// ================= GET WATCHLIST =================

const getWatchlistService = (userId, callback) => {

  const watchlistQuery = `
    SELECT id, stock_symbol, created_at
    FROM watchlist
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(
    watchlistQuery,
    [userId],
    (err, result) => {

      if (err) {
        console.log("Watchlist fetch error:", err);
        return callback(err);
      }

      return callback(null, result);
    }
  );
};


// ================= ADD TO WATCHLIST =================

const addToWatchlistService = (
  userId,
  stockSymbol,
  callback
) => {

  const insertQuery = `
    INSERT INTO watchlist
    (user_id, stock_symbol)
    VALUES (?, ?)
  `;

  db.query(
    insertQuery,
    [userId, stockSymbol],
    (err, result) => {

      if (err) {

        console.log(
          "Failed to insert watchlist data:",
          err
        );

        // Duplicate stock
        if (err.code === "ER_DUP_ENTRY") {
          return callback({
            type: "ALREADY_EXISTS"
          });
        }

        return callback(err);
      }

      return callback(null, {
        insertId: result.insertId,
        stockSymbol: stockSymbol
      });
    }
  );
};


// ================= DELETE WATCHLIST =================

const deleteWatchlistService = (
  userId,
  watchlistId,
  callback
) => {

  const deleteWatchlistQuery = `
    DELETE FROM watchlist
    WHERE id = ?
    AND user_id = ?
  `;

  db.query(
    deleteWatchlistQuery,
    [watchlistId, userId],
    (err, result) => {

      if (err) {

        console.log(
          "Failed to delete watchlist:",
          err
        );

        return callback(err);
      }

      // Watchlist item not found
      if (result.affectedRows === 0) {

        console.log(
          "Watchlist not found."
        );

        return callback({
          type: "WATCHLIST_NOT_FOUND"
        });
      }

      // Successful deletion
      return callback(null, {
        id: watchlistId
      });
    }
  );
};


module.exports = {
  getWatchlistService,
  addToWatchlistService,
  deleteWatchlistService
};