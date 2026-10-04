const Joi = require("joi");

const buyOrderSchema = Joi.object({
  stockSymbol: Joi.string()
    .trim()
    .uppercase()
    .max(20)
    .required()
    .messages({
      "string.empty": "Stock symbol is required",
      "string.max": "Stock symbol can't exceed 20 characters",
      "any.required": "Stock symbol is required"
    }),

  quantity: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Quantity must be a number",
      "number.integer": "Quantity must be a whole number",
      "number.positive": "Quantity must be greater than 0",
      "any.required": "Quantity is required"
    }),

  price: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.positive": "Price must be greater than 0",
      "any.required": "Price is required"
    })
});
const sellOrderSchema = Joi.object({
  stockSymbol: Joi.string()
    .trim()
    .uppercase()
    .max(20)
    .required()
    .messages({
      "string.empty": "Stock symbol is required",
      "string.max": "Stock symbol can't exceed 20 characters",
      "any.required": "Stock symbol is required"
    }),

  quantity: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Quantity must be a number",
      "number.integer": "Quantity must be a whole number",
      "number.positive": "Quantity must be greater than 0",
      "any.required": "Quantity is required"
    }),

  price: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Price must be a number",
      "number.positive": "Price must be greater than 0",
      "any.required": "Price is required"
    })
});

module.exports = {
  buyOrderSchema,
  sellOrderSchema
};