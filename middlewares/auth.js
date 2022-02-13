const jwt = require('../utils/jwt');

const createError = require('../utils/createError');

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    throw createError('unauthorized', 'Token not found');
  }

  jwt.verify(token);

  next();
};
