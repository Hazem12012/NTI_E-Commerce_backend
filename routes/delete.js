import express from "express";
const router = express.Router()

router.delete("/user/:id", express.json(), async (req, res) => {
  try {
    const deleteUser = await userModel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Deleted  successfully", deleteUser });
  } catch (error) {
    return res.status(404).json({ error: "failed  to delete" });
  }
});
export default router;
