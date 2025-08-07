// GET to represent the user by id
import express from "express";
import userModel from "../../model/userModel.js";

const router = express.Router();

router.route("/:id").get(async (req, res) => {
  try {
    const findUser = await userModel.findById(req.params.id);
    if (!findUser) {
      res.status(404).json({ mesage: "user not found" });
    } else {
      res.status(200).json({
        message: "User data",
        Email: findUser.email,
        age: findUser.age,
        userName: findUser.userName,
        confirm:findUser.confirmation,
        cart: findUser.cart,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
