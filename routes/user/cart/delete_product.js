import express from "express";
import userModel from "../../../model/userModel.js";

const router = express.Router();

router.route("/:id/cart/delete").delete(express.json(), async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const deleteProduct = await userModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { cart: { productId } } },
      { new: true }
    );

    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted from cart",
      cart: deleteProduct.cart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
