const errorMiddleware = (err, req, res, next)=> {
  console.log("Error occurred", err);
  return res.status(500).json({
    message : "Internal server error"
  })
}

module.exports = errorMiddleware;