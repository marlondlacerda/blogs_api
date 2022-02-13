const router = require('express').Router();
const rescue = require('express-rescue');

const userService = require('../services/userService');
const { validateWithJoi } = require('./utils/joi');
const { loginSchema, userSchema } = require('./utils/schemas');

router.post(
  '/user',
  rescue(async (req, res) => {
    validateWithJoi(userSchema, req.body);

    const { displayName, email, password, image } = req.body;

    const userToken = await userService.create(displayName, email, password, image);

    res.status(201).json({ token: userToken });
  }),
);

router.post(
  '/login',
  rescue(async (req, res) => {
    validateWithJoi(loginSchema, req.body);

    const { email, password } = req.body;

    const userToken = await userService.login(email, password);

    res.status(200).json({ token: userToken });
  }),
);

module.exports = router;
