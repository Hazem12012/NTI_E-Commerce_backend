import express from "express";
const router = express.Router()
// POST to login user
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exsistUser = await userModel.findOne({ email });
    if (!exsistUser) {
      res
        .status(404)
        .json({ message: "This email and password do not match !" });
      console.log("not exsist");
    } else {
      const matchPassword = await bcrypt.compare(password, exsistUser.password);
      if (!matchPassword) {
        res
          .status(404)
          .json({ message: "This email and password do not match !" });
        console.log("not matched");
      }
      return res.status(200).json({ message: "Login is success" });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});
export default router;
