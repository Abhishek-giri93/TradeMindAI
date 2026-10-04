const {
  getWatchlistService,
  addToWatchlistService,
  deleteWatchlistService
} = require("../services/watchlistService");


// ================= GET WATCHLIST =================

const getWatchlist = (req, res) => {
  const userId = req.user.userId;

  getWatchlistService(userId, (err, watchlist) => {
    if (err) {
      console.log("Get watchlist controller error:", err);

      return res.status(500).json({
        message: "Unable to fetch watchlist"
      });
    }

    return res.status(200).json({
      message: "Watchlist fetched successfully",
      watchlist
    });
  });
};


// ================= ADD TO WATCHLIST =================

const addToWatchlist = (req, res) => {
  const userId = req.user.userId;
  const { stockSymbol } = req.body;

  // Joi has already validated and normalized stockSymbol

  addToWatchlistService(
    userId,
    stockSymbol,
    (err, result) => {

      if (err) {

        if (err.type === "ALREADY_EXISTS") {
          return res.status(409).json({
            message: "Stock already exists in watchlist"
          });
        }

        console.log(
          "Add watchlist controller error:",
          err
        );

        return res.status(500).json({
          message: "Unable to add stock to watchlist"
        });
      }

      return res.status(201).json({
        message: "Stock added to watchlist successfully",
        watchlist: result
      });
    }
  );
};


// ================= DELETE WATCHLIST =================

const deleteWatchlist = (req, res) => {
  const userId = req.user.userId;
  
  deleteWatchlistService(
    userId,
    watchlistId,
    (err, result) => {

      if (err) {

        if (err.type === "WATCHLIST_NOT_FOUND") {
          return res.status(404).json({
            message: "Watchlist not found."
          });
        }

        console.log(
          "Delete watchlist controller error:",
          err
        );

        return res.status(500).json({
          message: "Unable to delete watchlist item"
        });
      }

      return res.status(200).json({
        message: "Stock removed from watchlist successfully",
        watchlist: result
      });
    }
  );
};


module.exports = {
  getWatchlist,
  addToWatchlist,
  deleteWatchlist
};