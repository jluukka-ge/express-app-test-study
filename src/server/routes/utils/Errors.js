class HttpError extends Error {
  get statusCode() { return 500; }
}

// HTTP error factory method
const customHttpError = statusCode => class extends HttpError {
  get statusCode() { return statusCode; }
};

module.exports = {
  HttpError,
  NotFoundError: customHttpError(404),
  BadRequestError: customHttpError(400),
  UnauthorizedError: customHttpError(401),
};
