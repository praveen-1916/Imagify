import { Router } from "express";
import { Generation } from "../controllers/Generationcontroller.js";

const router = Router();

router.post("/generate", Generation);

export default router;
