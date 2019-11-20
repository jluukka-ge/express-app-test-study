const bcrypt = require('bcryptjs');
const { crypto } = require('../../../constants');

/*
 * interface HashPasswordResult {
 *   password: string;
 *   hash: string;
 * }
 */

const hashPassword = async password => {
  const hash = await bcrypt.hash(password, crypto.SALT_ROUNDS);
  return {
    password,
    hash,
  };
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
