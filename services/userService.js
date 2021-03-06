const jwt = require('../utils/jwt');
const { Users } = require('../models');

const createError = require('../utils/createError');

const getAll = async () => {
  const users = await Users.findAll();

  return users.map((user) => user.dataValues);
};

const getById = async (id) => {
  const user = await Users.findByPk(id);

  if (!user) {
    throw createError('notFound', 'User does not exist');
  }

  return user.dataValues;
};

const verifyUserEmail = async (email) => {
  const user = await Users.findOne({
    where: { email },
  });

  if (!user) return null;

  return user.dataValues;
};

const create = async (displayName, email, password, image) => {
  const userEmail = await verifyUserEmail(email);

  if (userEmail) {
    throw createError('conflict', 'User already registered');
  }

  await Users.create({
    displayName,
    email,
    password,
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

  if (user.password !== password) {
    throw createError('invalid', 'Invalid fields');
  }

  const token = jwt.sign({ email: user.email });

  return token;
};

const deleteById = async (id) => Users.destroy({ where: { id } });

module.exports = {
  getAll,
  getById,
  verifyUserEmail,
  create,
  login,
  deleteById,
};
