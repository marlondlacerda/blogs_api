const joi = require('joi');

module.exports = (err, req, res, next) => {
  if (!joi.isError(err)) return next(err);

  res.status(400).json({ message: err.message });
};
