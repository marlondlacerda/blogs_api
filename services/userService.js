const { Users } = require('../models');

const getAll = async () => {
  const users = await Users.findAll();

  return users.map((user) => user.dataValues);
};

const create = async (displayName, email, password, image) => {
  const user = await Users.create({
    displayName,
    email,
    password,
    image,
  });

  return user.dataValues;
};

module.exports = {
  getAll,
  create,
};