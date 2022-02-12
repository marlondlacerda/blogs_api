const router = require('express').Router();

const userService = require('../services/userService');

router.get(
  '/',
  async (req, res) => {
    const users = await userService.getAll();

    res.status(200).json(users);
  },
);

module.exports = router;
