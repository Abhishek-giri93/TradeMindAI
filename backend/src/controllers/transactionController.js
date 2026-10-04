const {getTransactionsService} = require("../services/transactionService")
const getTransaction = (req, res) => {
  const userId = req.user.userId;
  getTransactionsService(userId, (err, transactions) => {

    if (err) {
      console.log(
        "Get transaction controller error:",
        err
      );

      return res.status(500).json({
        message: "History fetch failed"
      });
    }

    return res.status(200).json({
      message: "History fetched successfully",
      history: transactions
    });
  });
};

module.exports = {
  getTransaction
};