const db = require("../config/db");

// ========= portfolio get =============
const getHoldingsService = (userId, callback)=>{
  const holdingQuery = `SELECT id, stock_symbol, quantity, average_price, created_at, updated_at FROM holdings WHERE user_id = ? ORDER BY stock_symbol ASC`;
  db.query(holdingQuery, [userId], (err, result)=>{
    if(err){
      console.log("Holdings not fetched : " ,err);
      return callback(err);
    }
    return callback(null, result);
  })
}

// ================= GET PORTFOLIO SUMMARY SERVICE =================

const getPortfolioSummaryService = (userId, callback) => {

  const portfolioQuery = `
    SELECT
      COALESCE(
        SUM(quantity * average_price),
        0
      ) AS total_investment,

      COALESCE(
        SUM(quantity),
        0
      ) AS total_quantity

    FROM holdings
    WHERE user_id = ?
  `;

  db.query(
    portfolioQuery,
    [userId],
    (err, results) => {

      if (err) {
        console.log(
          "Portfolio summary fetch error:",
          err
        );

        return callback(err);
      }

      const portfolio = results[0];

      return callback(null, {
        totalInvestment:
          Number(portfolio.total_investment),

        totalQuantity:
          Number(portfolio.total_quantity)
      });
    }
  );
};

module.exports = {
  getHoldingsService,
  getPortfolioSummaryService
}