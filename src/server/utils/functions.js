/*
 * Utility functions for working with functions declaratively.
 */

/*
 * Execute functions in order, feeding outputs from functions to inputs for the next
 */
const pipe = (...fs) => input => fs.reduce((acc, f) => f(acc), input);

module.exports = {
  pipe,
};
