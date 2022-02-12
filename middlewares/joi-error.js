const Joi = require('joi');

module.exports = (err, req, res, next) => {
  if (!Joi.isError(err)) return next(err);

  const error = {
    code: 'UnprocessableEntity',
    message: err.message,
  };

  return res.status(422).json(error);
};
