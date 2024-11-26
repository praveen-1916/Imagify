import { Router } from "express";
import { Generation } from "../controllers/Generationcontroller.js";
import User from "../models/UserModel.js";

const router = Router();

router.post("/generate", Generation);

router.post("/create", async (req, res) => {
  try {
    await User.create(req.body);
    res.json({ success: true, message: "Created success" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
});

export default router;
