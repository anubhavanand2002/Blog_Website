import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(201).json({ status: true, message: "No User Found" });
    }
    return res
      .status(200)
      .json({ status: true, message: `${users.length} User Found!!!`, users });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server Error!!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(201).json({ status: true, message: "Email Not Found!!!" });
    }
    const is_same = bcrypt.compare(password, user.password);
    if (!is_same) {
      return res
        .status(201)
        .json({ status: true, message: "Email or Password may be wrong!!!" });
    }
    const userData = { id: user._id, name: user.name, email: user.email };
    const token = jwt.sign(userData, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ status: true, message: "Logged in Successfully!!!", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server Error!!" });
  }
};

export const register = async (req, res) => {
  //   console.log(req.body);
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "User Email Already Existed!!" });
    }

    const hashedPassword = bcrypt.hashSync(password);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res
      .status(200)
      .json({ status: true, message: "User Registered Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

export const getuser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    console.log(user);
    return res.status(200).json({
      status: true,
      message: "User details get successfully!!",
      user,
    });
  } catch (error) {
    return res.status(501).json({
      status: false,
      message: "Internal Server Error!!",
    });
  }
};
