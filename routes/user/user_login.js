// // POST to login user
import express from "express";
import bcrypt from "bcrypt";

import userModel from "../../model/userModel.js";

const router = express.Router();

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const exsistUser = await userModel.findOne({ email });
    if (!exsistUser) {
      res
        .status(404)
        .json({ message: "This email and password do not match !" });
      console.log("not exsist");
    } else {
      const matchPassword = await bcrypt.compare(password, exsistUser.password);
      if (!matchPassword) {
        res
          .status(404)
          .json({ message: "This email and password do not match !" });
        console.log("not matched");
      }
      return res.status(200).json({ message: "Login is success" });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});
export default router;
