const bcrypt = require("bcryptjs");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

// ============================================================
// REGISTER USER
// ============================================================

const registerUser = async (req, res) => {
  const name = req.body.name?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.beginTransaction((err) => {
      if (err) {
        console.error("Transaction start error:", err);

        return res.status(500).json({
          message: "Something went wrong!!",
        });
      }

      // --------------------------------------------------------
      // Insert user
      // --------------------------------------------------------

      const userQuery = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `;

      db.query(
        userQuery,
        [name, email, hashedPassword],
        (err, userResult) => {
          if (err) {
            return db.rollback(() => {
              if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                  message: "Email already registered!!",
                });
              }

              console.error("User creation error:", err);

              return res.status(500).json({
                message: "Something went wrong",
              });
            });
          }

          const userId = userResult.insertId;

          // ----------------------------------------------------
          // Create trading account
          // ----------------------------------------------------

          const accountQuery = `
            INSERT INTO accounts (user_id, balance)
            VALUES (?, ?)
          `;

          db.query(accountQuery, [userId, 0], (err) => {
            if (err) {
              return db.rollback(() => {
                console.error("Account creation error:", err);

                return res.status(500).json({
                  message: "Account creation failed",
                });
              });
            }

            // --------------------------------------------------
            // Commit transaction
            // --------------------------------------------------

            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  console.error("Transaction commit error:", err);

                  return res.status(500).json({
                    message: "Registration failed!!",
                  });
                });
              }

              return res.status(201).json({
                message: "Registration successfully completed.",
                userId,
              });
            });
          });
        }
      );
    });
  } catch (err) {
    console.error("Registration error:", err);

    return res.status(500).json({
      message: "Something went wrong!!",
    });
  }
};

// ============================================================
// LOGIN USER
// ============================================================

const loginUser = (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  try {
    const query = `
      SELECT id, name, email, password
      FROM users
      WHERE email = ?
    `;

    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Login database error:", err);

        return res.status(500).json({
          message: "Something went wrong while logging in.",
        });
      }

      // --------------------------------------------------------
      // User not found
      // --------------------------------------------------------

      if (results.length === 0) {
        return res.status(401).json({
          message: "Invalid user or password.",
        });
      }

      const user = results[0];

      // --------------------------------------------------------
      // Verify password
      // --------------------------------------------------------

      const isCorrectPassword = await bcrypt.compare(
        password,
        user.password
      );

      if (!isCorrectPassword) {
        return res.status(401).json({
          message: "Invalid user or password.",
        });
      }

      // --------------------------------------------------------
      // Create JWT
      // --------------------------------------------------------

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // --------------------------------------------------------
      // Store JWT in HttpOnly Cookie
      // --------------------------------------------------------
      // The JWT is NOT returned to the frontend.
      // Browser stores it securely in an HttpOnly cookie.

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000,
      });

      // --------------------------------------------------------
      // Login successful
      // --------------------------------------------------------

      return res.status(200).json({
        message: "Logged in successfully",
        userId: user.id,
        name: user.name,
        email: user.email,
      });
    });
  } catch (err) {
    console.error("Login error:", err);

    return res.status(500).json({
      message: "Login failed!!",
    });
  }
};

// ============================================================
// GET CURRENT USER
// ============================================================

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const query = `
      SELECT id, name, email, created_at
      FROM users
      WHERE id = ?
    `;

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error(
          "Error while fetching current user:",
          err
        );

        return res.status(500).json({
          message: "Failed to fetch user.",
        });
      }

      // --------------------------------------------------------
      // User not found
      // --------------------------------------------------------

      if (results.length === 0) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      // --------------------------------------------------------
      // Return current user
      // --------------------------------------------------------

      return res.status(200).json({
        user: results[0],
      });
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// ============================================================
// LOGOUT USER
// ============================================================

const logoutUser = (req, res) => {
  // --------------------------------------------------------
  // Clear HttpOnly authentication cookie
  // --------------------------------------------------------

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  // --------------------------------------------------------
  // Logout successful
  // --------------------------------------------------------

  return res.status(200).json({
    message: "Logged out successfully.",
  });
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};