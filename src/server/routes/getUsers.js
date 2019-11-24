const getHandler = getStorage => async (req, res) => {
  const { getUsers } = getStorage(req.__user);
  const users = await getUsers();
  res.send(users);
};

module.exports = {
  getHandler,
};
