import expressAsyncHandler from "express-async-handler";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = expressAsyncHandler(async (req, res) => {
  const {name, email, phone, password } = req.body;

  if (name && email && password) {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.send({
        ok: false,
        message: "User with this email already exist!",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash,name });
    await user.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10000m" }
    );

    return res
      .status(200)
      .send({ ok: true, message: "User created successfully!", token, user });
  }

  if (name && phone && password) {
    const userExist = await User.findOne({ phone });
    if (userExist) {
      return res.send({
        ok: false,
        message: "User with this email already exist!",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ phone, password: hash,name });
    await user.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10000m" }
    );

    return res
      .status(200)
      .send({ ok: true, message: "User created successfully!", token, user });
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;

  if (email && password && !phone) {
    const user = await User.findOne({ email });

    if (user) {
      const isAuth = await bcrypt.compare(password, user.password);
      if (!isAuth) {
        return res.send({ ok: false, message: "Incorrect credentials!" });
      }
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "100000m" }
      );

      return res.send({
        ok: true,
        message: "User successfully logged in!",
        user,
        token,
      });
    }
    return res.send({ok:false,message:"User does not exist!"})
  }

  if (phone && password && !email) {
    const user = await User.findOne({ phone });

    if (user) {
      const isAuth = await bcrypt.compare(password, user.password);
      if (!isAuth) {
        return res.send({ ok: false, message: "Incorrect credentials!" });
      }
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "100000m" }
      );

      return res.send({
        ok: true,
        message: "User successfully logged in!",
        user,
        token,
      });
    }
    return res.send({ok:false,message:"User does not exist!"})
  }
});







