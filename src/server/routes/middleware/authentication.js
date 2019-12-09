/*
 * Middleware for validating client sent token and attaching user data to the request object
 */

const { validateToken } = require('../../accounts/jwt');
const { UnauthorizedError } = require('../utils/Errors');

const getTokenFromHeaders = headers => {
  const { authorization = '' } = headers;
  const token = authorization.substring(8);
  return token;
};

const getUsernameFromToken = getUserByUsername => async (token) => {
  const payload = validateToken(token);
  const user = await getUserByUsername(payload.sub.username);
  return user;
};

const getMiddleware = getStorage => async (req, res, next) => {
  const { getUserByUsername } = getStorage();

  try {
    const token = getTokenFromHeaders(req.headers)
    // On successful validation, user data is attached to the request object
    const user = await getUsernameFromToken(getUserByUsername)(token);
    req.__user = user;
    next();
  } catch (e) {
    // Error in validation results in error being thrown and route execution is stopped
    next(new UnauthorizedError('Invalid token!'));
  }
};

module.exports = {
  getUsernameFromToken,

  getMiddleware,
};
