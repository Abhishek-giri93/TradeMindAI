const { getHoldingsService, getPortfolioSummaryService } = require("../services/portfolioService");

const getHoldings = (req, res)=>{
  const userId = req.user.userId;
  getHoldingsService(userId, (err, result) => {
    if(err){
      console.log("Holding not fetched..", err);
      return res.status(500).json({
        message : "Some error occured."
      })
    }
    return res.status(200).json({
      message : "holdings fetched successfully.",
      result
    })
  })
}

// ================= GET PORTFOLIO SUMMARY =================

const getPortfolioSummary = (req, res) => {

  const userId = req.user.userId;

  getPortfolioSummaryService(userId, (err, portfolio) => {

    if (err) {

      console.log("Portfolio summary controller error:", err);

      return res.status(500).json({
        message: "Unable to fetch portfolio summary"
      });
    }

    return res.status(200).json({
      message: "Portfolio summary fetched successfully",
      portfolio
    });

  });
};

module.exports = {
  getHoldings,
  getPortfolioSummary
}