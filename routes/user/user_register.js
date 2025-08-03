// // POST to login user
import express from "express";
import bcrypt from "bcrypt";

import userModel from "../../model/userModel.js";
const router = express.Router();

router.route("/register").post(async (req, res) => {
  try {
    const { email, password, age, userName } = req.body;

    const exsistUser = await userModel.findOne({ email });
    if (exsistUser) {
      return res.json({ message: "your is already exists go to login" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const addUser = await userModel.insertMany({
        email,
        password: hashedPassword,
        age,
        userName,
      });
      res.status(200).json({ message: "Success to register", addUser });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
export default router;
