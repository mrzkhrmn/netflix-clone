import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email!" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be at lesat 6 chracters!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }
    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "username already exists!" });
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, error: "All fields are required!" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "user not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }

    generateTokenAndSetCookie(user._id, res);

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
