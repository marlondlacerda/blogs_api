const { Op } = require('sequelize');

const { BlogPosts, Users, Categories } = require('../models');

const categoriesService = require('./categoriesService');
const createError = require('../utils/createError');

const create = async (title, content, categoryIds, userId) => {
  await categoriesService.verifyCategory(categoryIds);

  const newPost = await BlogPosts.create({
    title,
    content,
    userId,
  });

  return newPost.dataValues;
};

const getAll = async () => {
  const post = await BlogPosts.findAll({
      include: [
        {
          model: Users, as: 'user', attributes: { exclude: 'password' },
        },
        {
          model: Categories, as: 'categories', through: { attributes: [] },
        },
      ],
  });

  return post;
};

const getById = async (id) => {
  const post = await BlogPosts.findOne({
    where: { id },
    include: [
      {
        model: Users, as: 'user', attributes: { exclude: 'password' },
      },
      {
        model: Categories, as: 'categories', through: { attributes: [] },
      },
    ],
  });

  if (!post) {
    throw createError('notFound', 'Post does not exist');
  }

  return post;
};

const search = async (query) => {
  const post = await BlogPosts.findAll({
    where: { [Op.or]: [{ title: { [Op.substring]: query } },
      { content: { [Op.substring]: query } }] },
    include: [
      {
        model: Users, as: 'user', attributes: { exclude: 'password' },
      },
      {
        model: Categories, as: 'categories', through: { attributes: [] },
      },
    ],
  });

  if (!post) {
    return [];
  }

  return post;
};

const update = async (id, title, content, userId) => {
  const post = await BlogPosts.findOne({
    where: { id }, 
    attributes: { exclude: ['published', 'updated'] },
    include: [
      {
        model: Categories, as: 'categories', through: { attributes: [] },
      },
    ],
  });

  if (!post) {
    throw createError('notFound', 'Post does not exist');
  }

  if (post.userId !== userId) {
    throw createError('unauthorized', 'Unauthorized user');
  }

  await post.update({ title, content });

  return post.dataValues;
};

const remove = async (id, userId) => {
  const post = await BlogPosts.findOne({
    where: { id },
  });

  if (!post) {
    throw createError('notFound', 'Post does not exist');
  }

  if (post.userId !== userId) {
    throw createError('unauthorized', 'Unauthorized user');
  }

  await post.destroy();

  return true;
};

module.exports = {
  create,
  getAll,
  getById,
  search,
  update,
  remove,
};
