const argon2 = require('argon2');
const jwt = require('../utils/jwt');
const { Users } = require('../models');

// const isPasswordValid

const getAll = async () => {
  const users = await Users.findAll();

  return users.map((user) => user.dataValues);
};

const getByEmail = async (email) => {
  const user = await Users.findOne({
    where: { email },
  });

  if (!user) {
    return null;
  }

  return user.dataValues;
};

const create = async (displayName, email, password, image) => {
  const passwordHash = await argon2.hash(password, { type: argon2.argon2id });

  await Users.create({
    displayName,
    email,
    password: passwordHash,
    image,
  });

  const token = jwt.sign({ displayName });

  return token;
};

module.exports = {
  getAll,
  getByEmail,
  create,
};