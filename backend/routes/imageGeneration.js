import { Router } from "express";
import { Generation } from "../controllers/Generationcontroller";

const imageRouter = Router();

imageRouter.post("/generate", Generation);

export default imageRouter;
