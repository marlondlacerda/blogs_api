const router = require('express').Router();
const rescue = require('express-rescue');

const postService = require('../services/postService');
const { validateWithJoi } = require('./utils/joi');
const { postSchema, updatePostSchema } = require('./utils/schemas');
const createError = require('../utils/createError');

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

router.get(
  '/',
  rescue(async (req, res) => {
    const posts = await postService.getAll();

    res.status(200).json(posts);
  }),
);

router.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const post = await postService.getById(id);

    res.status(200).json(post);
  }),
);

router.put(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    validateWithJoi(updatePostSchema, { title, content });

    if (req.body.categoryIds) {
      throw createError('invalid', 'Categories cannot be edited');
    }

    const post = await postService.update(id, title, content, req.userId);

    res.status(200).json(post);
  }),
);

module.exports = router;
