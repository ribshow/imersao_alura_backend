import createCollection from "../models/user.js";

const createUser = async (req, res) => {
  const usersCreated = await createCollection();
  res.status(200).json(usersCreated);
};

export default createUser;
