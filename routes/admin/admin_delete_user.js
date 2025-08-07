// delete user
import express from "express";
import { compare } from "bcrypt";
import userModel from "../../model/userModel.js";

const router = express.Router();
router.route("/:id/delete_user").delete(express.json(), async (req, res) => {
  try {
    const userFind = await userModel.findById(req.params.id);


    

    if (!userFind) {
      return res.status(404).json({ message: "this user is not found" });
    } else {
      const deletedUser = await userModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Deleted success", deletedUser });
    }
    // const matchEmail = email === userFind.email;
    // const matchPassword = await compare(password, userFind.password);

    // if (!matchEmail || !matchPassword) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
