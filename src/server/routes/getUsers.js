const getHandler = storage => async (req, res) => {
  const { getUsers } = storage(req.__user);
  const users = await getUsers();
  res.send(users);
};

module.exports = {
  getHandler,
};
