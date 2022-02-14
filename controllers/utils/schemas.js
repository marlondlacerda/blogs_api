const Joi = require('joi');

const categoriesSchema = Joi.object().keys({
  name: Joi.string().required(),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
});

const postSchema = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().integer().required()).required(),
});

const userSchema = Joi.object().keys({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
  image: Joi.string().required(),
});

module.exports = {
  categoriesSchema,
  loginSchema,
  postSchema,
  userSchema,
};
