import User from "./models/user.models.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Access Denied, No token provided");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (user) {
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
