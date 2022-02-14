const router = require('express').Router();
const rescue = require('express-rescue');

const postService = require('../services/postService');
const { validateWithJoi } = require('./utils/joi');
const { postSchema } = require('./utils/schemas');

router.post(
  '/',
  rescue(async (req, res) => {
    validateWithJoi(postSchema, req.body);

    const { userId } = req;
    const { title, content, categoryIds } = req.body;

    const post = await postService.create(title, content, categoryIds, userId);

    res.status(201).json(post);
  }),
);

module.exports = router;
