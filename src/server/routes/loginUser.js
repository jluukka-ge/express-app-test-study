const { jwt } = require('../accounts');
const {
  BadRequestError,
} = require('../utils/Errors');
const { comparePassword } = require('../accounts/password');
const { getItemByProps } = require('./utils/modelQueries');

const queryIsValid = (username, password) => !!username && !!password;

const loginIsValid = async (User, username, password) => {
  const user = await getItemByProps(User, { username });
  return comparePassword(password, user.password);
};

const getToken = username => jwt.issueToken({ username });

const getHandler = ({ User }) => async (req, res) => {
  const { username, password } = req.body;
  if (!queryIsValid(username, password)) throw new BadRequestError('Invalid login credentials!');

  const validLogin = await loginIsValid(User, username, password);
  if (!validLogin) throw new BadRequestError('Invalid login credentials!');

  const token = getToken(username);
  res.send(token);
};

module.exports = {
  loginIsValid,
  getToken,
  getHandler,
};
