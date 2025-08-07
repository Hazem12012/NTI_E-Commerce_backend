import express from "express";
import userModel from "../../model/userModel.js";

const router = express.Router();

router.route("/users").get(async (req, res) => {
  try {
    const exsist = await userModel.findById(req.params.id);
    if (exsist.type !== "admin") {
      return res
        .status(400)
        .json({ message: " you can't do this ,you are a user" });
    }
    const users = await userModel.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "All users",
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
