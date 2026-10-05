// =====================================================
// ORDER CONTROLLER
// =====================================================

const {
  placeBuyOrderService,
  placeSellOrderService,
  getOrderService,
  cancelOrderService,
} = require("../services/orderService");


// =====================================================
// COMMON ERROR HANDLER
// =====================================================

const handleControllerError = (res, error) => {

  console.error(
    "Order Controller Error:",
    error
  );

  // -----------------------------------------------
  // Known application errors
  // -----------------------------------------------

  const statusCodes = {

    INVALID_STOCK_SYMBOL: 400,

    INVALID_QUANTITY: 400,

    INVALID_MARKET_PRICE: 502,

    MARKET_DATA_ERROR: 502,

    ACCOUNT_NOT_FOUND: 404,

    INSUFFICIENT_BALANCE: 400,

    BALANCE_UPDATE_FAILED: 500,

    HOLDING_NOT_FOUND: 404,

    INSUFFICIENT_QUANTITY: 400,

    HOLDING_CREATION_FAILED: 500,

    HOLDING_UPDATE_FAILED: 500,

    HOLDING_DELETE_FAILED: 500,

    ORDER_COMPLETION_FAILED: 500,

    INVALID_ORDER_ID: 400,

    ORDER_NOT_CANCELLABLE: 400,

  };


  const statusCode =
    statusCodes[
      error?.type
    ] || 500;


  return res.status(statusCode).json({

    success: false,

    error: {

      type:
        error?.type ||
        "INTERNAL_SERVER_ERROR",

      message:
        error?.message ||
        "Something went wrong",

    },

  });
};


// =====================================================
// PLACE BUY ORDER
// POST /api/orders/buy
// =====================================================

const placeBuyOrder = (req, res) => {

  // ---------------------------------------------------
  // GET USER ID
  // ---------------------------------------------------

  const userId =
    req.user?.id;


  if (!userId) {

    return res.status(401).json({

      success: false,

      error: {

        type: "UNAUTHORIZED",

        message:
          "User authentication required",

      },

    });
  }


  // ---------------------------------------------------
  // GET REQUEST DATA
  // ---------------------------------------------------

  const {
    stockSymbol,
    quantity,
  } = req.body;


  // ---------------------------------------------------
  // CALL BUY SERVICE
  // ---------------------------------------------------

  return placeBuyOrderService(

    userId,

    stockSymbol,

    quantity,

    (error, result) => {

      // -----------------------------------------------
      // SERVICE ERROR
      // -----------------------------------------------

      if (error) {

        return handleControllerError(
          res,
          error
        );
      }


      // -----------------------------------------------
      // SUCCESS
      // -----------------------------------------------

      return res.status(201).json({

        success: true,

        message:
          "Buy order placed successfully",

        data: result,

      });

    }

  );
};


// =====================================================
// PLACE SELL ORDER
// POST /api/orders/sell
// =====================================================

const placeSellOrder = (req, res) => {

  // ---------------------------------------------------
  // GET USER ID
  // ---------------------------------------------------

  const userId =
    req.user?.id;


  if (!userId) {

    return res.status(401).json({

      success: false,

      error: {

        type: "UNAUTHORIZED",

        message:
          "User authentication required",

      },

    });
  }


  // ---------------------------------------------------
  // GET REQUEST DATA
  // ---------------------------------------------------

  const {
    stockSymbol,
    quantity,
  } = req.body;


  // ---------------------------------------------------
  // CALL SELL SERVICE
  // ---------------------------------------------------

  return placeSellOrderService(

    userId,

    stockSymbol,

    quantity,

    (error, result) => {

      // -----------------------------------------------
      // SERVICE ERROR
      // -----------------------------------------------

      if (error) {

        return handleControllerError(
          res,
          error
        );
      }


      // -----------------------------------------------
      // SUCCESS
      // -----------------------------------------------

      return res.status(201).json({

        success: true,

        message:
          "Sell order placed successfully",

        data: result,

      });

    }

  );
};


// =====================================================
// GET USER ORDERS
// GET /api/orders
// =====================================================

const getOrders = (req, res) => {

  // ---------------------------------------------------
  // GET USER ID
  // ---------------------------------------------------

  const userId =
    req.user?.id;


  if (!userId) {

    return res.status(401).json({

      success: false,

      error: {

        type: "UNAUTHORIZED",

        message:
          "User authentication required",

      },

    });
  }


  // ---------------------------------------------------
  // CALL SERVICE
  // ---------------------------------------------------

  return getOrderService(

    userId,

    (error, orders) => {

      // -----------------------------------------------
      // SERVICE ERROR
      // -----------------------------------------------

      if (error) {

        return handleControllerError(
          res,
          error
        );
      }


      // -----------------------------------------------
      // SUCCESS
      // -----------------------------------------------

      return res.status(200).json({

        success: true,

        data: orders,

      });

    }

  );
};


// =====================================================
// CANCEL ORDER
// PATCH /api/orders/:orderId/cancel
// =====================================================

const cancelOrder = (req, res) => {

  // ---------------------------------------------------
  // GET USER ID
  // ---------------------------------------------------

  const userId =
    req.user?.id;


  if (!userId) {

    return res.status(401).json({

      success: false,

      error: {

        type: "UNAUTHORIZED",

        message:
          "User authentication required",

      },

    });
  }


  // ---------------------------------------------------
  // GET ORDER ID
  // ---------------------------------------------------

  const {
    orderId,
  } = req.params;


  // ---------------------------------------------------
  // CALL SERVICE
  // ---------------------------------------------------

  return cancelOrderService(

    userId,

    orderId,

    (error, result) => {

      // -----------------------------------------------
      // SERVICE ERROR
      // -----------------------------------------------

      if (error) {

        return handleControllerError(
          res,
          error
        );
      }


      // -----------------------------------------------
      // SUCCESS
      // -----------------------------------------------

      return res.status(200).json({

        success: true,

        message:
          "Order cancelled successfully",

        data: result,

      });

    }

  );
};


// =====================================================
// EXPORT CONTROLLER
// =====================================================

module.exports = {

  placeBuyOrder,

  placeSellOrder,

  getOrders,

  cancelOrder,

};