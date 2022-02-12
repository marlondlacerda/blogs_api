const argon2 = require('argon2');
const { Users } = require('../models');

// const isPasswordValid

const getAll = async () => {
  const users = await Users.findAll();

  return users.map((user) => user.dataValues);
};

const create = async (displayName, email, password, image) => {
  const passwordHash = await argon2.hash(password, { type: argon2.argon2id });

  const user = await Users.create({
    displayName,
    email,
    password: passwordHash,
    image,
  });

  return user.dataValues;
};

module.exports = {
  getAll,
  create,
};