import express from "express";
import userModel from "../../model/userModel.js";

const router = express.Router();

// GET to represent the user by id
router.route("/:id").get(async (req, res) => {
  try {
    const findUser = await userModel.findById(req.params.id);
    if (!findUser) {
      res.status(404).json({ mesage: "user not found" });
    } else {
      res.status(200).json({ message: "User data", findUser });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
