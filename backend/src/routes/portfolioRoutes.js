const express = require("express");


const {
  getHoldings,
  getPortfolioSummary
} = require("../controllers/portfolioController");

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/holdings",
  authMiddleware,
  getHoldings
);

// GET PORTFOLIO SUMMARY
router.get(
  "/summary",
  authMiddleware,
  getPortfolioSummary
);

module.exports = router;