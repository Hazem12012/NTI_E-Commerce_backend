import express from "express";
import userModel from "../../../model/userModel.js";

const router = express.Router();

router.route("/:id/cart/add").put(express.json(), async (req, res) => {
  const { name, price, quantity, image } = req.body;

  try {
    if (
      !name ||
      typeof price !== "number" ||
      typeof quantity !== "number" ||
      !image
    ) {
      return res
        .status(400)
        .json({ message: "Missing or invalid product data" });
    }

    const productId = Math.random().toString(36).substring(2, 12);

    const item = { productId, name, price, quantity, image };

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { $push: { cart: item } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Item added to cart", cart: updatedUser.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
