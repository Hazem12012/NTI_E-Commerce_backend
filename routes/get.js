import express from "express";
const router = express.Router()

// GET to represent the users
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ message: "All users", users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



export default router;
