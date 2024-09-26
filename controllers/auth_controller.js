import User from "../models/userModel";

const register_controller = async (req, res) => {
  try {
    const { first_name, email, password } = req.body;

    if (!first_name || !email || !password)
      return res
        .status(400)
        .send({ success: false, message: `Please provide all details` });

    const existing_user = await User.findOne({ email });

    if (existing_user)
      return res.status(200).send({
        success: false,
        message: "Email already resgister , u can login",
      });

    const user = await User.create({ name, email, password });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in register controller",
      success: false,
      error,
    });
  }
};

export default register_controller;
