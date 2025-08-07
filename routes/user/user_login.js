import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../../model/userModel.js";

const router = express.Router();

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const message = !email ? "Enter your email" : "Enter your password";
      return res.status(400).json({ message });
    }

    const exsistUser = await userModel.findOne({ email });
    if (!exsistUser) {
      return res
        .status(401)
        .json({ message: "This email and password do not match!" });
    }

    const matchPassword = await bcrypt.compare(password, exsistUser.password);
    if (!matchPassword) {
      return res
        .status(401)
        .json({ message: "This email and password do not match!" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      {
        id: exsistUser._id,
        email: exsistUser.email,
        type: exsistUser.type,
      },
      SECRET_KEY,
      { expiresIn: "1h" } // ⏱️ Token expires in 1 hour
    );

    // ✅ Send token in response
    return res.status(200).json({
      message: "Login is success",
      token,
      type: exsistUser.type,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
