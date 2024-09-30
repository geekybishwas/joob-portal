import User from "../models/userModel.js";

export const updateUserController = async (req, res) => {
  const { first_name, last_name, email, location } = req.body;

  if (!first_name || !email || !location || !last_name) {
    next("Please provide all fields");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.first_name = first_name;
  user.last_name = llast_name;
  user.email = email;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  res.status(200).json({
    user,
    token,
  });
};
