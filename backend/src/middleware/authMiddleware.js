const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  //get a uthentication header-
  const cookieToken = req.cookies?.accessToken;
  const authHeader = req.headers.authorization;
  // check if header exists-
  const token = cookieToken || (
    authHeader ? authHeader.split(" ")[1] : null
  );
  
  if(!token){
    return res.status(401).json({
      message: "Access denied. Token is required."
    });
  }
  
  try{
    // verify token-
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // storing the value.

    // Move to next middleware / route
    next();
  }catch(err){
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}
module.exports = authMiddleware;