const { BlogPosts } = require('../models');

const categoriesService = require('./categoriesService');

const create = async (title, content, categoryIds, userId) => {
  await categoriesService.verifyCategory(categoryIds);

  const newPost = await BlogPosts.create({
    title,
    content,
    userId,
  });

  return newPost.dataValues;
};

module.exports = {
  create,
};
