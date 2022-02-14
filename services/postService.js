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

module.exports = {
  create,
  getAll,
  getById,
};
