const { issueToken } = require('../accounts/jwt');
const { comparePassword } = require('../accounts/password');
const { BadRequestError } = require('./utils/Errors');

const queryIsValid = (username, password) => !!username && !!password;
const getToken = username => issueToken({ username });

const getHandler = storage => async (req, res) => {
  const { getPasswordByUsername } = storage();
  const { username, password } = req.body;
  if (!queryIsValid(username, password)) throw new BadRequestError('Invalid login credentials!');

  const passwordFromDB = await getPasswordByUsername(username);
  const validLogin = comparePassword(password, passwordFromDB);
  if (!validLogin) throw new BadRequestError('Invalid login credentials!');

  const token = getToken(username);
  res.send(token);
};

module.exports = {
  queryIsValid,
  getToken,
  getHandler,
};
