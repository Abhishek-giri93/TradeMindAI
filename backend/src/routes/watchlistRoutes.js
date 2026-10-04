const express = require('express');
const validate = require("../middleware/validationMiddleware");
const { addWatchlistSchema, deleteWatchlistSchema } = require("../validators/watchlistValidators");

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {getWatchlist, addToWatchlist, deleteWatchlist} = require('../controllers/watchlistController');


router.get("/", authMiddleware, getWatchlist);
router.post("/",  authMiddleware, validate(addWatchlistSchema),addToWatchlist);
router.delete("/:id",authMiddleware, validate(deleteWatchlistSchema, "params"), deleteWatchlist );

module.exports = router;