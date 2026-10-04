const express = require('express');
const validate = require("../middleware/validationMiddleware");
const { buyOrderSchema , sellOrderSchema} = require("../validators/orderValidators");
const router = express.Router();

const{ placeBuyOrder, placeSellOrder, getOrders, cancelOrder } = require('../controllers/orderController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/buy', validate(buyOrderSchema),authMiddleware, placeBuyOrder);

router.post('/sell', validate(sellOrderSchema),authMiddleware, placeSellOrder);

router.get("/", authMiddleware, getOrders);

router.patch(
  "/:orderId/cancel",
  authMiddleware,
  cancelOrder
);

module.exports = router;