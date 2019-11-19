const { HttpError } = require('../utils/Errors');

const DEFAULT = {
  STATUS_CODE: 500,
  MESSAGE: 'An unexpected error occurred!',
};

const getStatusCode = err => (err instanceof HttpError) ? err.statusCode : DEFAULT.STATUS_CODE;
const getMessage = err => (err instanceof HttpError) ? err.message : DEFAULT.MESSAGE;

const getHandler = () => (err, req, res, next) => {
  if (err) {
    const status = getStatusCode(err);
    const message = getMessage(err);

    console.log(err);
    res.status(status).send({
      status,
      message,
    });
  } else {
    next();
  }
};

module.exports = {
  DEFAULT,
  getStatusCode,
  getMessage,
  getHandler,
};
