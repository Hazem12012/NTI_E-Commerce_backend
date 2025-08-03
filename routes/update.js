import express from "express";
const router = express.Router()

// PUT to update the user data
router.put("/user/:id", express.json(), async (req, res) => {
  // const { id } = req.params;

  try {
    // const { email, age, userName } = req.body;

    // const exsistUser = userModel.findOne(email);
    // if (!exsistUser) {
    //   res.status(500).json({ message: "This email is not found" });
    // }

    const exsist = await userModel.finOne({ _id: req.params.id });
    if (!exsist) {
      return res.json({ message: "this id is not correct " });
    }
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { returnDocument: "after" }
    );
    res.status(200).json({ message: "Updated successfully", updateUser });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
export default router;
