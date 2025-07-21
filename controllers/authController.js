import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, name, password: hashedPassword });

    await newUser.save();

    return res.status(201).json({ msg: "User created successfully" });
  } catch (error) {

    return res.status(500).json({ msg: "Server error" });
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(200).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(200).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const dataReturn = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    }

    return res.status(200).json({
      message: "Login successful",
      user: dataReturn,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
    });
  }
}
