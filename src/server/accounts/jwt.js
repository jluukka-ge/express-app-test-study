const jwt = require('jsonwebtoken');

const HOUR = 3600;
const SECRET = process.env.JWT_SIGNING_SECRET;

const getSecondsNow = () => Math.floor(new Date().getTime() / 1000);

/**
 * Issues a new signed JSON Web token.
 * @param sub The subject (token holder's) identifier
 * @param validFor How long should the token stay valid (in seconds)
 */
const issueToken = (sub, validFor = HOUR) => {
  const iat = getSecondsNow();
  const exp = iat + Math.floor(validFor);
  const payload = {
    sub,
    iat,
    exp,
  };
  return jwt.sign(payload, SECRET);
};

/**
 * Validates the given JSON web token.
 * @param token The signed JSON Web token to validate
 * @returns The token payload if the token was valid
 * @throws An error if token was invalid
 */
const validateToken = token => {
  return jwt.verify(token, SECRET);
};

module.exports = {
  issueToken,
  validateToken,
};
