const getUserById = (req, res) => {
  const userId = req.params.id;
  
  res.send(`Get a specific user by ID: ${userId}`);
};

const createUser = (req, res) => {
  res.send(`Create a new user`);
};

const updateUser = (req, res) => {
  res.send(`Update a specific user`);
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  
  res.send(`Delete a specific user by ID: ${userId}`);
};

export default {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};