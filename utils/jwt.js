const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const sign = (payload) => 
  jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

const veryfy = (token) => 
  jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });

module.exports = {
    sign,
    veryfy,
};
