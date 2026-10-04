const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();     // --------- Router keeps the same route at one place baby
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middleware/authMiddleware");
const { registerUser,
  loginUser,
  getCurrentUser,
  logoutUser
} = require("../controllers/authController");

const validate = require("../middleware/validationMiddleware");
const { registerSchema , loginSchema} = require("../validators/authValidators");

router.get("/protected", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Protected route tested successfully.",
    user: req.user
  })
})

router.post('/register', validate(registerSchema), registerUser);

router.post("/login",validate(loginSchema), loginUser);

router.get("/me", authMiddleware, getCurrentUser);

router.post("/logout", logoutUser);

module.exports = router;