const { issueToken } = require('../accounts/jwt');
const { comparePassword } = require('../accounts/password');
const { BadRequestError } = require('./utils/Errors');

const queryIsValid = (username, password) => !!username && !!password;
const getToken = username => issueToken({ username });

const getHandler = getStorage => async (req, res) => {
  const { getPasswordByUsername } = getStorage();
  const { username, password } = req.body;

  if (!queryIsValid(username, password)) throw new BadRequestError('Invalid login credentials!');

  // Compare password from the request to the one in DB
  const passwordFromDB = await getPasswordByUsername(username);
  const validLogin = comparePassword(password, passwordFromDB);

  if (!validLogin) throw new BadRequestError('Invalid login credentials!');

  // Return a new JWT token
  const token = getToken(username);
  res.send(token);
};

module.exports = {
  queryIsValid,
  getToken,
  getHandler,
};
