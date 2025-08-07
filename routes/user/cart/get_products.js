import express from "express";
import userModel from "../../../model/userModel.js";
const router = express.Router();

router.route("/:id/cart").get(express.json(), async (req, res) => {
  try {
    const findUser = await userModel.findById(req.params.id);
    if (!findUser ) {
      console.log(findUser);
      return res.status(400).json({ message: "cant found this user" });
    } else {
      const dynamicKey = `${findUser.userName} cart`;
      return res.status(200).json({ [dynamicKey]: findUser.cart });
    }
  } catch (error) {
    if (error.name === "CastError" && error.path === "_id") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
  }
});
export default router;
