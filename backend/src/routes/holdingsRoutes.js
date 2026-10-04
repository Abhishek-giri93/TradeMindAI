const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const { getHoldings } = require("../controllers/holdingsController");

const router = express.Router();

// ================= GET USER HOLDINGS =================

router.get(
  "/",
  authMiddleware,
  getHoldings
);

module.exports = router;