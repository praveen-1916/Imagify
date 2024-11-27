import { Webhook } from "svix";
import User from "../models/UserModel.js";
import "dotenv/config";
import razorpay from "razorpay";
import Payment from "../models/PaymentModel.js";

// API controller function to manage clerk user with database

//https://imagify-backend-xmu3.onrender.com/api/user/webhook

const ClerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    console.log(type);

    switch (type) {
      case "user.created": {
        const userDetails = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };

        await User.create(userDetails);
        res.json({ success: true, message: "Account Created Successfully" });

        break;
      }
      case "user.updated": {
        const userUpdateDetails = {
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };

        await User.findOneAndUpdate({ clerkId: data.id }, userUpdateDetails);
        res.json({ success: true, message: "Account Created Successfully" });

        break;
      }
      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        res.json({ success: true, message: "Account Deleted Successfully" });

        break;
      }
      default:
        res.json({ success: false, message: "Something went wrong" });
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const getCreditBalance = async (req, res) => {
  try {
    const { clerkId } = req.body;
    const userData = await User.findOne(clerkId);
    res.json({
      success: true,
      message: "Creditbalance updated",
      creditBalance: userData.creditBalance,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//payment gateway initialize
const razorPayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//api to make payment gateway
const paymentRazorPay = async (req, res) => {
  try {
    const { clerkId, planId } = req.body;

    // const userData = await User.findOne(clerkId);

    if (!clerkId || !planId) {
      res.json({ success: false, message: "Please provide valid data!" });
    }

    // const credits,amount,plan

    switch (planId) {
      case "Basic": {
        credits = 100;
        plan = "Basic";
        amount = 10;
        break;
      }
      case "Advanced": {
        credits = 500;
        plan = "Advanced";
        amount = 50;
        break;
      }

      case "Business": {
        credits = 5000;
        plan = "Business";
        amount = 500;
        break;
      }

      default:
        break;
    }

    const paymentData = {
      clerkId,
      amount,
      credits,
      plan,
    };

    const newPayment = await Payment.create(paymentData);

    const options = {
      amount: amount * 100,
      currency: process.env.RAZORPAY_CURRENCY,
      receipt: newPayment._id,
    };

    await razorPayInstance.orders.create(options, (error, order) => {
      if (error) {
        res.json({ success: false, message: error.message });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { ClerkWebhooks, getCreditBalance, paymentRazorPay };
