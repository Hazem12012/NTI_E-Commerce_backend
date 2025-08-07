import express from "express";
import userModel from "../../model/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

router.route("/:id/confirm").post(express.json(), async (req, res) => {
  try {
    const { email } = req.body;

    const findUser = await userModel.findById(req.params.id);
    if (!findUser) {
      return res.status(404).json({ message: "This user is undefined" });
    }

    if (email !== findUser.email) {
      return res.status(404).json({ message: "This email does not match" });
    } else {
      await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: findUser.email,
        subject: "Confirm Email",
        text: `Hello ${findUser.userName}, welcome to your site, confirmation is success 👌. `,
      });
      await userModel.findByIdAndUpdate(req.params.id, { confirmation: true });
      res.status(200).json({ message: "Email sent successfully." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
