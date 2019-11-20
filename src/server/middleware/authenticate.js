const { validateToken } = require('../accounts/jwt');
const { UnauthorizedError } = require('../utils/Errors');

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.substring(8);
  try {
    const payload = validateToken(token);
    req.__authPayload = payload;
    console.log({payload});
  } catch (e) {
    throw new UnauthorizedError('Invalid token!');
  }
  next();
};

module.exports = {
  authenticate,
};
