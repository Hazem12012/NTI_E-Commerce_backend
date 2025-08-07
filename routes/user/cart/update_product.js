import express from "express";
import userModel from "../../../model/userModel.js";
const router = express.Router();

router.route("/:id/cart/update").put(express.json(), async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }
    console.log(productId);
    console.log(quantity);

    const updatedCart = await userModel.findOneAndUpdate(
      { _id: req.params.id, "cart.productId": productId },
      { $set: { "cart.$.quantity": quantity } },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "Product quantity updated",
      cart: updatedCart.cart,
    });

    if (!updatedCart) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Product deleted from cart",
      cart: updatedUser.cart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
