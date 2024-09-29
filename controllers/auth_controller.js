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

const login_controller = async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    next("Please provide all fields");
  }

  // find user by email
  const user = await User.findOne({ email });

  if (!user) next("Please signup first");

  // comapre password
  const isMatch = await user.comaprePassword(password);

  if (!isMatch) next("Invalid credentials");

  const token = user.createJWT();

  res.status(200).json({
    success: true,
    message: "Login successfully",
    user,
    token,
  });
};

export default { register_controller, login_controller };
