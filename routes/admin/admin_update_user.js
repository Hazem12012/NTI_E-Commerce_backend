// PUT to update the user data
import express from "express";
import userModel from "../../model/userModel.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.route("/:id/update_user").put(express.json(), async (req, res) => {
  const { userName, password, age, confirmation } = req.body;

  try {
    if (!password || !userName || typeof age !== "number") {
      return res.status(400).json({ message: "Invalid input" });
    }
    const exsist = await userModel.findById(req.params.id);
    if (!exsist) {
      return res.status(400).json({ message: "this id is not correct " });
    }
        if (exsist.type !== "admin") {
          return res.status(400).json({ message: " you can't do this ,you are a user" });
        }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { userName, password: hashedPassword, age,confirmation },
      { returnDocument: "after" }
    );
    res.status(200).json({ message: "Updated successfully", updateUser });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
