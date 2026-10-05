const express = require("express");

const router = express.Router();

// Authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// Controllers
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser
} = require("../controllers/authController");

// Validation middleware
const validate = require("../middleware/validationMiddleware");

// Validation schemas
const {
  registerSchema,
  loginSchema
} = require("../validators/authValidators");

// ============================================================
// TEST PROTECTED ROUTE
// ============================================================

router.get("/protected", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Protected route tested successfully.",
    user: req.user
  });
});

// ============================================================
// REGISTER
// ============================================================

router.post(
  "/register",
  validate(registerSchema),
  registerUser
);

// ============================================================
// LOGIN
// ============================================================

router.post(
  "/login",
  validate(loginSchema),
  loginUser
);

// ============================================================
// GET CURRENT USER
// ============================================================

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

// ============================================================
// LOGOUT
// ============================================================

router.post(
  "/logout",
  logoutUser
);

module.exports = router;