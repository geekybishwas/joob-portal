import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const auth_header = req.headers.authorization;
  // Check if authorization header exists and starts with "Bearer"
  if (!auth_header || !auth_header.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authentication failed: No or invalid token" });
  }
  const token = auth_header.split(" ")[1];
  try {
    const pay_load = JWT.verify(token, process.env.JWT_SECRET);

    req.user = { userId: pay_load.userId };
    next();
  } catch (error) {
    next("Auth failes");
  }
};

export default userAuth;
