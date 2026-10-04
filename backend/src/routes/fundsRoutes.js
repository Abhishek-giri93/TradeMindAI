const express = require('express');
const validate = require("../middleware/validationMiddleware");
const { depositSchema, withdrawSchema } = require("../validators/fundsValidators");
const {getBalance, depositFuds ,withdrawFunds, getTransactions } = require('../controllers/fundsController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/balance',authMiddleware ,getBalance);
router.post("/deposit", authMiddleware,validate(depositSchema), depositFuds);
router.post("/withdraw", authMiddleware,validate(withdrawSchema), withdrawFunds);
router.get("/transactions", authMiddleware, getTransactions);

module.exports = router;