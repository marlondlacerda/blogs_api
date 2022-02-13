const router = require('express').Router();
const rescue = require('express-rescue');
const Joi = require('joi');

const userService = require('../services/userService');
const { validateWithJoi } = require('./utils/joi');

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
});

router.post(
  '/',
  rescue(async (req, res) => {
    validateWithJoi(loginSchema, req.body);

    const { email, password } = req.body;

    const userToken = await userService.login(email, password);

    res.status(200).json({ token: userToken });
  }),
);

module.exports = router;
