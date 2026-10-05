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

  // validationn

  // formating a email using regex-

  // password reges-

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.beginTransaction((err) => {
      if (err) {
        console.log("Some error occurred!!", err);

        return res.status(500).json({
          message: "Something went wrong!!",
        });
      }

      // Insert user-
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

              console.log("Something went wrong", err);

              return res.status(500).json({
                message: "Something went wrong",
              });
            });
          }

          const user_id = userResult.insertId;

          // Creating trading account-
          const accountQuery = `
            INSERT INTO accounts (user_id, balance)
            VALUES (?, ?)
          `;

          db.query(accountQuery, [user_id, 0], (err) => {
            if (err) {
              return db.rollback(() => {
                console.error("Account creation error", err);

                res.status(500).json({
                  message: "Account creation failed",
                });
              });
            }

            // Everything is successful then-
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  console.log("Error while committing!!", err);

                  res.status(500).json({
                    message: "Registration failed!!",
                  });
                });
              }

              res.status(200).json({
                message: "Registration successfully completed.",
                userId: user_id,
              });
            });
          });
        }
      );
    });
  } catch (err) {
    console.log("Something went wrong", err);

    res.status(500).json({
      message: "Something went wrong!!",
    });
  }
};

// ============================================================
// LOGIN USER
// ============================================================

const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Error handling-
  try {
    const query = `
      SELECT id, name, email, password
      FROM users
      WHERE email = ?
    `;

    db.query(query, [email], async (err, results) => {
      if (err) {
        console.log(
          "Some error occurred while data searching!!",
          err
        );

        return res.status(501).json({
          message: "Some error occurred while data searching!!",
        });
      }

      if (results.length === 0) {
        return res.status(401).json({
          message: "Invalid user or password.",
        });
      }

      const user = results[0];

      // Compare password-
      const isCorrectPassword = await bcrypt.compare(
        password,
        user.password
      );

      if (!isCorrectPassword) {
        return res.status(401).json({
          message: "Invalid user or password.",
        });
      }

      // ========================================================
      // CREATE JWT TOKEN
      // ========================================================

      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // ========================================================
      // STORE JWT TOKEN IN HTTP-ONLY COOKIE
      // ========================================================

      res.cookie("accessToken", token, {
        httpOnly: true,

        // Production application is running on HTTPS
        secure: true,

        // Frontend and backend are on different sites
        sameSite: "none",

        // Cookie expires after 1 hour
        maxAge: 60 * 60 * 1000,
      });

      // ========================================================
      // LOGIN SUCCESSFUL
      // ========================================================

      return res.status(200).json({
        message: "Logged in successfully",
        userId: user.id,
        name: user.name,
        email: user.email,
      });
    });
  } catch (err) {
    console.log("Login error", err);

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
        console.log(
          "Error while fetching current user:",
          err
        );

        return res.status(500).json({
          message: "Failed to fetch user.",
        });
      }

      if (results.length === 0) {
        console.log("User not found.");

        return res.status(404).json({
          message: "User not found.",
        });
      }

      return res.status(200).json({
        user: results[0],
      });
    });
  } catch (error) {
    console.log("Get current user error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// ============================================================
// LOGOUT USER
// ============================================================

const logoutUser = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

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