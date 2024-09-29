import User from "../models/userModel.js";

const register_controller = async (req, res, next) => {
  const { first_name, email, password } = req.body;

  if (!first_name || !email || !password) next("name is required");

  const existing_user = await User.findOne({ email });

  if (existing_user) next("Email already register, please login");

  const user = await User.create({ first_name, email, password });

  const token = user.createJWT();

  return res.status(200).send({
    success: true,
    messgae: "User created succesfully",
    user: user,
    token,
  });
};

export default register_controller;
