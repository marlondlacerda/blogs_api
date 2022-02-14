const jwt = require('../utils/jwt');

const userService = require('../services/userService');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const { email } = jwt.verify(token);
    const { id } = await userService.verifyUserEmail(email);

    req.userId = id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};