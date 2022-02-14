const router = require('express').Router();
const rescue = require('express-rescue');

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

    res.status(200).json(user);
  }),
);

router.delete(
  '/me',
  rescue(async (req, res) => {
    await userService.deleteById(req.userId);

    res.status(204).end();
  }),
);

module.exports = router;
