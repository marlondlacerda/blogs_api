const argon2 = require('argon2');
const jwt = require('../utils/jwt');
const { Users } = require('../models');

const createError = require('../utils/createError');
// const isPasswordValid

const getAll = async () => {
  const users = await Users.findAll();

  return users.map((user) => user.dataValues);
};

const verifyUserEmail = async (email) => {
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

  const userEmail = await verifyUserEmail(email);

  if (userEmail) {
    throw createError('conflict', 'User already registered');
  }

  await Users.create({
    displayName,
    email,
    password: passwordHash,
    image,
  });

  const token = jwt.sign({ email });

  return token;
};

const login = async (email, password) => {
  const user = await verifyUserEmail(email);

  if (!user) {
    throw createError('invalid', 'Invalid fields');
  }

  const passwordValid = await argon2.verify(user.password, password);

  if (!passwordValid) {
    throw createError('invalid', 'Invalid fields');
  }

  const token = jwt.sign({ email: user.email });

  return token;
};

module.exports = {
  getAll,
  create,
  login,
};
