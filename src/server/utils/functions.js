/*
 * Utility functions for working with functions declaratively.
 */

/*
 * Pipe function produces big functions from small ones. For example:
 *
 * pipe(
 *   add(2),
 *   multiply(4),
 *   subtract(3)
 * )(2)
 *
 * is equal to ((2 + 2) * 4) - 3
 */
const pipe = (...fs) => input => fs.reduce((acc, f) => f(acc), input);

module.exports = {
  pipe,
};
