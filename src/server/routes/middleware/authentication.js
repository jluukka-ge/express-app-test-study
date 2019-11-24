/*
 * Middleware for validating client sent token and attaching user data to the request object
 */

const { validateToken } = require('../../accounts/jwt');
const { UnauthorizedError } = require('../utils/Errors');

const getMiddleware = getStorage => async (req, res, next) => {
  const { getUserByUsername } = getStorage();

  // Get token from headers
  const { authorization } = req.headers;
  const token = authorization.substring(8);

  try {
    // On successful validation, user data is attached to the request object
    const payload = validateToken(token);
    const user = await getUserByUsername(payload.sub.username);
    req.__user = user;
  } catch (e) {
    // Error in validation results in error being thrown and route execution is stopped
    throw new UnauthorizedError('Invalid token!');
  }
  next();
};

module.exports = {
  getMiddleware,
};
