import { Router } from "express";
import {
  ClerkWebhooks,
  getCreditBalance,
  paymentRazorPay,
  verifyRazorPayPayment,
} from "../controllers/UserController.js";
import authUser from "../middlewares/authUser.js";

const authRouter = Router();

authRouter.post("/webhooks", ClerkWebhooks);
authRouter.get("/creditbalance", authUser, getCreditBalance);
authRouter.post("/razor-pay", authUser, paymentRazorPay);
authRouter.post("/verify-razor-pay", verifyRazorPayPayment);

export default authRouter;
