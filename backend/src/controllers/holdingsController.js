const db = require("../config/db");
const { getStockQuote } = require("../services/marketService");

// ================= GET HOLDINGS =================

const getHoldings = (req, res) => {
  const userId = req.user.userId;

  const query = `
    SELECT
      id,
      stock_symbol,
      quantity,
      average_price
    FROM holdings
    WHERE user_id = ?
    ORDER BY stock_symbol ASC
  `;

  db.query(query, [userId], async (error, results) => {

    // ==========================================
    // DATABASE ERROR
    // ==========================================

    if (error) {
      console.log(
        "Get holdings controller error:",
        error
      );

      return res.status(500).json({
        message: "Unable to fetch holdings."
      });
    }

    try {

      // ==========================================
      // FETCH MARKET DATA
      // ==========================================

      const holdingsWithMarketData = await Promise.all(
        results.map(async (holding) => {

          try {

            console.log(
              `Fetching market data for: ${holding.stock_symbol}`
            );

            const marketData = await getStockQuote(
              holding.stock_symbol
            );

            console.log(
              `Market data for ${holding.stock_symbol}:`,
              marketData
            );

            // ======================================
            // CURRENT MARKET PRICE
            // ======================================

            const currentPrice = Number(
              marketData?.last_price
            );

            if (
              !Number.isFinite(currentPrice) ||
              currentPrice <= 0
            ) {
              throw new Error(
                `Invalid current price received for ${holding.stock_symbol}`
              );
            }

            // ======================================
            // DATABASE VALUES
            // ======================================

            const quantity = Number(
              holding.quantity
            );

            const averagePrice = Number(
              holding.average_price
            );

            // ======================================
            // PORTFOLIO CALCULATIONS
            // ======================================

            const investment =
              quantity * averagePrice;

            const currentValue =
              quantity * currentPrice;

            const profitLoss =
              currentValue - investment;

            const returnPercent =
              investment > 0
                ? (profitLoss / investment) * 100
                : 0;

            // ======================================
            // FINAL HOLDING OBJECT
            // ======================================

            return {
              id: holding.id,

              stock_symbol:
                holding.stock_symbol,

              quantity,

              average_price:
                averagePrice,

              current_price:
                Number(
                  currentPrice.toFixed(2)
                ),

              investment:
                Number(
                  investment.toFixed(2)
                ),

              current_value:
                Number(
                  currentValue.toFixed(2)
                ),

              profit_loss:
                Number(
                  profitLoss.toFixed(2)
                ),

              return_percent:
                Number(
                  returnPercent.toFixed(2)
                )
            };

          } catch (stockError) {

            console.error(
              `Failed to fetch market data for ${holding.stock_symbol}:`,
              stockError.message
            );

            throw stockError;
          }
        })
      );

      // ==========================================
      // SUCCESS RESPONSE
      // ==========================================

      return res.status(200).json({
        message:
          "Holdings fetched successfully.",

        holdings:
          holdingsWithMarketData
      });

    } catch (marketError) {

      console.error(
        "Holdings market data error:",
        marketError
      );

      return res.status(500).json({
        message:
          "Unable to fetch current market prices.",

        error:
          marketError.message
      });
    }
  });
};

module.exports = {
  getHoldings
};