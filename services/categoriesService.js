const { Categories } = require('../models');

const creatError = require('../utils/createError'); 

const getAll = async () => {
  const categories = await Categories.findAll();

  return categories.map((category) => category.dataValues);
};

const verifyCategory = async (ids) => {
  const categories = await Categories.findAll();
  const categoryIds = categories.map((category) => category.dataValues.id);

  const validateId = ids.every((id) => categoryIds.includes(id));

  if (!validateId) {
    throw creatError('invalid', '"categoryIds" not found');
  }
};

const create = async (name) => {
  const categories = await Categories.create({
    name,
  });

  return categories.dataValues;
};

module.exports = {
  verifyCategory,
  getAll,
  create,
};
