const { jwt } = require('../accounts');

const {
  BadRequestError,
} = require('../utils/Errors');

const loginIsValid = (username, password) => !!username && !!password;

const getToken = username => jwt.issueToken(username);

const getHandler = () => async (req, res) => {
  const { username, password } = req.body;
  if (!loginIsValid(username, password)) throw new BadRequestError('Invalid login credentials!');
  const token = getToken(username);
  res.send(token);
};

module.exports = {
  loginIsValid,
  getToken,
  getHandler,
};
