import { Router } from "express";
import { Generation } from "../controllers/Generationcontroller.js";
import authUser from "../middlewares/authUser.js";

const imageRouter = Router();

imageRouter.post("/generate", authUser, Generation);

export default imageRouter;
