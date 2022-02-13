const { Categories } = require('../models');

const getAll = async () => {
  const categories = await Categories.findAll();

  return categories.map((category) => category.dataValues);
};

const create = async (name) => {
  const categories = await Categories.create({
    name,
  });

  return categories.dataValues;
};

module.exports = {
  getAll,
  create,
};
