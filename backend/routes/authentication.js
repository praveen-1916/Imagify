import { Router } from "express";
import { ClerkWebhooks } from "../controllers/UserController.js";

const router = Router();

router.post("/webhooks", ClerkWebhooks);

export default router;
