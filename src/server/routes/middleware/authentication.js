const { validateToken } = require('../../accounts/jwt');
const { UnauthorizedError } = require('../../utils/Errors');
const { getItemByProps, projectByLenses } = require('../utils/modelQueries');
const { publicLenses } = require('../../models/User');

const publicLenseSet = Object.values(publicLenses);

const getMiddleware = ({ User }) => async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.substring(8);
  try {
    const payload = validateToken(token);
    const user = await getItemByProps(User, { username: payload.sub.username });
    const publicUserData = projectByLenses(publicLenseSet)(user);
    req.__user = publicUserData;
  } catch (e) {
    console.log(e);
    throw new UnauthorizedError('Invalid token!');
  }
  next();
};

module.exports = {
  getMiddleware,
};
