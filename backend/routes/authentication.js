import { Router } from "express";
import { ClerkWebhooks } from "../controllers/UserController.js";

const router = Router();

router.post("/webhook", ClerkWebhooks);

export default router;
