const router = require('express').Router();
const rescue = require('express-rescue');
const Joi = require('joi');

const userService = require('../services/userService');
const { validateWithJoi } = require('./utils/joi');

const userSchema = Joi.object().keys({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

router.get(
  '/',
  rescue(async (req, res) => {
    const users = await userService.getAll();

    res.status(200).json(users);
  }),
);

router.post(
  '/',
  rescue(async (req, res) => {
    validateWithJoi(userSchema, req.body);

    const { displayName, email, password, image } = req.body;

    const userToken = await userService.create(displayName, email, password, image);

    res.status(201).json(userToken);
  }),
);

module.exports = router;
