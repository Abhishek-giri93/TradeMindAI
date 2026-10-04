const Joi = require('joi');

const addWatchlistSchema = Joi.object({
  stockSymbol: Joi.string()
    .trim()
    .uppercase()
    .max(20)
    .required()
    .messages({
      "string.max": "Stock symbol cannot exceed 20 characters",
      "string.empty": "Stock symbol is required",
      "any.required": "Stock symbol is required"
    })
})

const deleteWatchlistSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Watchlist id must be a number",
      "number.integer": "Watchlist id must be a whole number",
      "number.positive": "Watchlist id must be greater than 0",
      "any.required": "Watchlist id is required"
    })
})


module.exports = {
  addWatchlistSchema,
  deleteWatchlistSchema
}