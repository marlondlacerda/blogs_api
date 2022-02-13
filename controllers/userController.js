const router = require('express').Router();
const rescue = require('express-rescue');

const createError = require('../utils/createError');
const userService = require('../services/userService');

router.get(
  '/',
  rescue(async (req, res) => {
    const users = await userService.getAll();

    res.status(200).json(users);
  }),
);

router.get(
  '/:id',
  rescue(async (req, res) => {
    const user = await userService.getById(req.params.id);
    console.log(user);

    res.status(200).json(user);
  }),
);

module.exports = router;
