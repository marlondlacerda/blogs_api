const router = require('express').Router();
const rescue = require('express-rescue');

const categoriesService = require('../services/categoriesService');
const { validateWithJoi } = require('./utils/joi');
const { categoriesSchema } = require('./utils/schemas');

router.post(
  '/',
  rescue(async (req, res) => {
    validateWithJoi(categoriesSchema, req.body);

    const category = await categoriesService.create(req.body.name);

    res.status(201).json(category);
  }),
);

module.exports = router;
