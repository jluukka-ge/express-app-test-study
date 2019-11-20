const pipe = (...fs) => input => fs.reduce((acc, f) => f(acc), input);

module.exports = {
  pipe,
};
