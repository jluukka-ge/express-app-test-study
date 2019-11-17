const { HttpError } = require('../utils/Errors');

const getHandler = () => (err, req, res, next) => {
  if (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).send({
        status: err.statusCode,
        message: err.message,
      });
    } else {
      console.log(err);
      res.status(500).send({
        status: 500,
        message: 'An unexpected error occurred!',
      });
    }
  } else {
    next();
  }
};

module.exports = {
  getHandler,
};
