const getHandler = ({ User }) => async (req, res) => {
  const users = await User.query();
  res.send(users);
};

module.exports = {
  getHandler,
};
