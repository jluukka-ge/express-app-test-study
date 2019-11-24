const { validateToken } = require('../../accounts/jwt');
const { UnauthorizedError } = require('../utils/Errors');

const getMiddleware = storage => async (req, res, next) => {
  const { getUserByUsername } = storage();

  const { authorization } = req.headers;
  const token = authorization.substring(8);
  try {
    const payload = validateToken(token);
    const user = await getUserByUsername(payload.sub.username);
    req.__user = user;
  } catch (e) {
    console.log(e);
    throw new UnauthorizedError('Invalid token!');
  }
  next();
};

module.exports = {
  getMiddleware,
};
