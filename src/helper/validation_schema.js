const validator = require("password-validator")
const validatorEmail = require("validator")
const joi = require("joi")
const { joiPassword } = require("joi-password")

module.exports.productSchema = joi.object({
  productName: joi.string().min(3).max(45).required(),
  description: joi.string().min(50).max(300).required(),
  price: joi.number().integer().required(),
  stock: joi.number().integer().required(),
  idCategory: joi.number().integer().required(),
  image: joi.string()
})

module.exports.categorySchema = joi.object({
  categoryName: joi.string().min(3).max(45).required(),
  slug: joi.string().min(3).max(45).required(),
})

const passwordSchema = new validator();
passwordSchema
  .is().min(8, "Too short, password should have minimum 8 chacracters")
  .has().uppercase(1, "Password should have minimum 1 uppercase letter")
  .has().digits(1, "Password should have minimum 1 digit letter")
  .has().not().spaces(1, "Password should not have spaces");

const emailSchema = new validator()
  .min(6, "Too short, email should have minimum 6 chacracters")
  .usingPlugin(validatorEmail.isEmail, "Email should contain @ character");

module.exports.registerSchema = joi.object({
  fullname: joi.string().min(3).max(45).required(),
  username: joi.string().min(3).max(45).alphanum().required(),
  email: joi.string().email().required(),
  password: joiPassword
    .string()
    .min(8)
    .max(45)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required()
    .messages({
      "password.minOfUppercase": "{#label} should contain at least {#min} uppercase character",
      "password.minOfSpecialCharacters": "{#label} should contain at least {#min} special character",
      "password.minOfLowercase": "{#label} should contain at least {#min} lowercase character",
      "password.minOfNumeric": "{#label} should contain at least {#min} numeric character",
      "password.noWhiteSpaces": "{#label} should not contain white spaces",
    }),
  re_password: joi.valid(joi.ref("password")).messages({
    "any.only": "Password must match",
  }),
})

module.exports.loginSchema = joi.object({
  login: joi
  .alternatives()
  .try(joi.string().min(6).max(45).alphanum(), joi.string().email())
  .required(),
  password: joi.string().required(),
})

module.exports.editSchema = joi.object({
  username: joi.string().min(6).max(45).alphanum().required(),
  fullname: joi.string().min(6).max(45).required(),
  dob: joi.string().required(),
  gender: joi.string().required(),
})