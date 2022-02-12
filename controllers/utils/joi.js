const validateWithJoi = (schema, body) => {
  const { error } = schema.validate(body);

  if (error) throw error;
};

module.exports = {
  validateWithJoi,
};