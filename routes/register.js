// POST to add  user [register]
import express from "express";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { email, password, age, userName } = req.body;
    const exsistUser = await userModel.findOne({ email });
    if (exsistUser) {
      return res.json({ message: "your is already exists go to login" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const addUser = await userModel.insertOne(req.body);
      res.status(200).json({ message: "Success to register", addUser });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
export default router;
