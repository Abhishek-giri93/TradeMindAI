const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');

const {getTransaction} = require('../controllers/transactionController');

const router = express.Router();

router.get('/', authMiddleware, getTransaction);

module.exports = router;