const jwt = require("jsonwebtoken");

// ============================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================

const authMiddleware = (req, res, next) => {
  // --------------------------------------------------------
  // Get JWT from HttpOnly cookie
  // --------------------------------------------------------

  const cookieToken = req.cookies?.accessToken;

  // --------------------------------------------------------
  // Optional Authorization header
  // --------------------------------------------------------
  // Kept for backward compatibility with existing APIs.

  const authHeader = req.headers.authorization;

  const headerToken =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  // --------------------------------------------------------
  // Prefer cookie authentication
  // --------------------------------------------------------

  const token = cookieToken || headerToken;

  // --------------------------------------------------------
  // Token not found
  // --------------------------------------------------------

  if (!token) {
    return res.status(401).json({
      message: "Access denied. Authentication required.",
    });
  }

  // --------------------------------------------------------
  // Verify JWT
  // --------------------------------------------------------

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store decoded user information
    // for the next controller/route.
    req.user = decoded;

    // Move to next middleware / route
    next();

  } catch (err) {
    console.error(
      "JWT verification error:",
      err.message
    );

    return res.status(401).json({
      message: "Invalid or expired authentication token.",
    });
  }
};

module.exports = authMiddleware;