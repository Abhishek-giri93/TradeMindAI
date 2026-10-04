const Joi = require("joi");

const depositSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be greater than 0",
      "any.required": "Amount is required"
    })
});

const withdrawSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be greater than 0",
      "any.required": "Amount is required"
    })
});

module.exports = {
  depositSchema,
  withdrawSchema
};