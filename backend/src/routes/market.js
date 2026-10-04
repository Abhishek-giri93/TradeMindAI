const express = require("express");

const router = express.Router();


// ==========================================
// SEARCH MARKET STOCKS
// ==========================================

router.get("/search", async (req, res) => {

  try {

    const query = String(
      req.query.query || ""
    )
      .trim()
      .toLowerCase();


    // ----------------------------------------
    // VALIDATION
    // ----------------------------------------

    if (!query) {

      return res.status(200).json({
        success: true,
        data: [],
      });

    }


    // ----------------------------------------
    // TEMPORARY STOCK UNIVERSE
    // ----------------------------------------
    // We will replace this with a database /
    // real market instrument source later.

    const stocks = [
      {
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd",
        exchange: "NSE",
      },

      {
        symbol: "TCS",
        name: "Tata Consultancy Services Ltd",
        exchange: "NSE",
      },

      {
        symbol: "INFY",
        name: "Infosys Ltd",
        exchange: "NSE",
      },

      {
        symbol: "HDFCBANK",
        name: "HDFC Bank Ltd",
        exchange: "NSE",
      },

      {
        symbol: "ICICIBANK",
        name: "ICICI Bank Ltd",
        exchange: "NSE",
      },

      {
        symbol: "SBIN",
        name: "State Bank of India",
        exchange: "NSE",
      },

      {
        symbol: "ITC",
        name: "ITC Ltd",
        exchange: "NSE",
      },

      {
        symbol: "LT",
        name: "Larsen & Toubro Ltd",
        exchange: "NSE",
      },

      {
        symbol: "BHARTIARTL",
        name: "Bharti Airtel Ltd",
        exchange: "NSE",
      },

      {
        symbol: "AXISBANK",
        name: "Axis Bank Ltd",
        exchange: "NSE",
      },
    ];


    // ----------------------------------------
    // SEARCH
    // ----------------------------------------

    const results = stocks.filter(
      (stock) => {

        const symbol =
          stock.symbol.toLowerCase();

        const name =
          stock.name.toLowerCase();

        return (
          symbol.includes(query) ||
          name.includes(query)
        );

      }
    );


    // ----------------------------------------
    // RESPONSE
    // ----------------------------------------

    return res.status(200).json({

      success: true,

      data: results.slice(0, 8),

    });

  } catch (error) {

    console.error(
      "Market search error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to search market stocks",

    });

  }

});


// ==========================================
// GET MARKET QUOTE
// ==========================================

router.get(
  "/quote/:symbol",
  async (req, res) => {

    try {

      const symbol =
        req.params.symbol.toUpperCase();


      // --------------------------------------
      // TEMPORARY MARKET DATA
      // --------------------------------------

      const price = 2485.40;

      const change = 12.40;

      const changePercent = 0.50;


      return res.status(200).json({

        success: true,

        data: {

          symbol,

          price,

          change,

          changePercent,

          timestamp: new Date(),

        },

      });

    } catch (error) {

      console.error(
        "Market route error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch market data",

      });

    }

  }
);


module.exports = router;