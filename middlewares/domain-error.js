module.exports = (err, req, res, next) => {
  const errorMap = {
    invalid: 400,
    notFound: 404,
    unauthorized: 401,
    invalidToken: 401,
    conflict: 409,
  };
  
  const status = errorMap[err.code];

  if (!status) return next(err);

  res.status(status).json({ message: err.message });
};
