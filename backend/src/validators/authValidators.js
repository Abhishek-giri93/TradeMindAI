const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name can't exceed 100 characters",
      "any.required": "Name is required"
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .max(50)
    .required()
    .messages({
      "string.email": "Please provide a valid email",
      "string.max": "Email can't exceed 50 characters",
      "any.required": "Email is required"
    }),

  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).+$"
      )
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      "string.empty": "Password is required",
      "any.required": "Password is required"
    })
});


const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .max(50)
    .required()
    .messages({
      "string.email": "Invalid user or password",
      "string.max": "Email can't exceed 50 characters",
      "string.empty": "Email is required",
      "string.required": "Email is required"
    })
  ,
  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
      "any.required": "Password is required"
    })
})

module.exports = {
  registerSchema,
  loginSchema
};