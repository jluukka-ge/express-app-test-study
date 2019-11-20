const authenticate = (req, res, next) => {
  console.log('Is authenticated');
  next();
};

module.exports = {
  authenticate,
};
