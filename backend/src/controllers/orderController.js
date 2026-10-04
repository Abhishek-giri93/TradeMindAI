const {
  placeBuyOrderService,
  placeSellOrderService,
  getOrderService,
  cancelOrderService,
} = require("../services/orderService");


// ======================================================
// PLACE BUY ORDER
// ======================================================

const placeBuyOrder = (req, res) => {
  const userId = req.user.userId;

  const {
    stockSymbol,
    quantity,
  } = req.body;


  // ====================================================
  // CALL BUY SERVICE
  // Price is NOT taken from frontend.
  // Service gets the latest market price.
  // ====================================================

  placeBuyOrderService(
    userId,
    stockSymbol,
    quantity,
    (err, result) => {

      // ================================================
      // SERVICE ERROR
      // ================================================

      if (err) {

        // Account does not exist
        if (err.type === "ACCOUNT_NOT_FOUND") {
          return res.status(404).json({
            message: "Trading account not found.",
          });
        }


        // Invalid stock symbol
        if (err.type === "INVALID_STOCK_SYMBOL") {
          return res.status(400).json({
            message: err.message,
          });
        }


        // Invalid quantity
        if (err.type === "INVALID_QUANTITY") {
          return res.status(400).json({
            message: err.message,
          });
        }


        // Insufficient balance
        if (err.type === "INSUFFICIENT_BALANCE") {
          return res.status(400).json({
            message: "Insufficient balance.",
            availableBalance: err.availableBalance,
            requiredAmount: err.requiredAmount,
          });
        }


        // Market API error
        if (err.type === "MARKET_DATA_ERROR") {
          return res.status(502).json({
            message: "Unable to fetch current market price.",
          });
        }


        // Log unexpected error
        console.error(
          "Buy order service error:",
          err
        );

        return res.status(500).json({
          message: "Unable to place buy order.",
        });
      }


      // ================================================
      // SUCCESS
      // ================================================

      return res.status(201).json({
        message: "Buy order placed successfully.",

        orderId: result.orderId,

        transactionId: result.transactionId,

        stockSymbol: result.stockSymbol,

        quantity: result.quantity,

        price: result.price,

        totalAmount: result.totalAmount,

        remainingBalance: result.remainingBalance,

      });
    }
  );
};


// ======================================================
// PLACE SELL ORDER
// ======================================================

const placeSellOrder = (req, res) => {
  const userId = req.user.userId;

  const {
    stockSymbol,
    quantity,
  } = req.body;


  // ====================================================
  // CALL SELL SERVICE
  // Price is NOT taken from frontend.
  // Service gets the current market price.
  // ====================================================

  placeSellOrderService(
    userId,
    stockSymbol,
    quantity,
    (err, result) => {

      // ================================================
      // SERVICE ERROR
      // ================================================

      if (err) {

        // Holding does not exist
        if (err.type === "HOLDING_NOT_FOUND") {
          return res.status(404).json({
            message: "Holding not found.",
          });
        }


        // Not enough shares
        if (err.type === "INSUFFICIENT_QUANTITY") {
          return res.status(400).json({
            message: "Insufficient quantity.",
          });
        }


        // Trading account missing
        if (err.type === "ACCOUNT_NOT_FOUND") {
          return res.status(404).json({
            message: "Trading account not found.",
          });
        }


        // Invalid stock symbol
        if (err.type === "INVALID_STOCK_SYMBOL") {
          return res.status(400).json({
            message: err.message,
          });
        }


        // Invalid quantity
        if (err.type === "INVALID_QUANTITY") {
          return res.status(400).json({
            message: err.message,
          });
        }


        // Market API error
        if (err.type === "MARKET_DATA_ERROR") {
          return res.status(502).json({
            message: "Unable to fetch current market price.",
          });
        }


        // Log unexpected error
        console.error(
          "Sell order service error:",
          err
        );

        return res.status(500).json({
          message: "Unable to place sell order.",
        });
      }


      // ================================================
      // SUCCESS
      // ================================================

      return res.status(201).json({
        message: "Sell order placed successfully.",

        orderId: result.orderId,

        transactionId: result.transactionId,

        stockSymbol: result.stockSymbol,

        quantity: result.quantity,

        price: result.price,

        totalAmount: result.totalAmount,

        remainingQuantity: result.remainingQuantity,

      });
    }
  );
};


// ======================================================
// GET ORDERS
// ======================================================

const getOrders = (req, res) => {
  const userId = req.user.userId;


  getOrderService(
    userId,
    (err, result) => {

      // ================================================
      // ERROR
      // ================================================

      if (err) {

        console.error(
          "Get orders service error:",
          err
        );

        return res.status(500).json({
          message: "Unable to fetch orders.",
        });
      }


      // ================================================
      // SUCCESS
      // ================================================

      return res.status(200).json({
        message: "Orders fetched successfully.",
        result,
      });
    }
  );
};


// ======================================================
// CANCEL ORDER
// ======================================================

const cancelOrder = (req, res) => {
  const userId = req.user.userId;

  const orderId = req.params.orderId;


  // ====================================================
  // CANCEL ORDER SERVICE
  // ====================================================

  cancelOrderService(
    userId,
    orderId,
    (err, result) => {

      // ================================================
      // ERROR
      // ================================================

      if (err) {

        // Invalid order ID
        if (err.type === "INVALID_ORDER_ID") {
          return res.status(400).json({
            message: err.message,
          });
        }


        // Order cannot be cancelled
        if (err.type === "ORDER_NOT_CANCELLABLE") {
          return res.status(400).json({
            message: err.message,
          });
        }


        // Order not found
        if (err.type === "ORDER_NOT_FOUND") {
          return res.status(404).json({
            message: err.message,
          });
        }


        // Unexpected error
        console.error(
          "Cancel order service error:",
          err
        );

        return res.status(500).json({
          message: "Unable to cancel order.",
        });
      }


      // ================================================
      // SUCCESS
      // ================================================

      return res.status(200).json({
        message: "Order cancelled successfully.",

        orderId: result.orderId,

        status: result.status,
      });
    }
  );
};


// ======================================================
// EXPORT CONTROLLERS
// ======================================================

module.exports = {
  placeBuyOrder,
  placeSellOrder,
  getOrders,
  cancelOrder,
};