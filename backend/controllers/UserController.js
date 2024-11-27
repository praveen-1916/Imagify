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
    const userData = await User.findOne({ clerkId: clerkId });
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

    const paymentData = {
      clerkId: clerkId,
      amount: 0,
      credits: 0,
      plan: "",
    };

    switch (planId) {
      case "Basic": {
        paymentData.credits = 100;
        paymentData.plan = "Basic";
        paymentData.amount = 10;
        break;
      }
      case "Advanced": {
        paymentData.credits = 500;
        paymentData.plan = "Advanced";
        paymentData.amount = 50;
        break;
      }

      case "Business": {
        paymentData.credits = 5000;
        paymentData.plan = "Business";
        paymentData.amount = 500;
        break;
      }

      default:
        break;
    }

    const newPayment = await Payment.create(paymentData);

    const options = {
      amount: paymentData.amount * 100,
      currency: process.env.RAZORPAY_CURRENCY,
      receipt: newPayment._id,
    };

    await razorPayInstance.orders.create(options, (error, order) => {
      if (error) {
        res.json({
          success: false,
          error: "At Instance",
          message: error.message,
        });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      error: "Catch userController",
      message: error.message,
    });
  }
};

//api to verify payment status

const verifyRazorPayPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const paymentData = await Payment.findById(orderInfo.receipt);
      if (paymentData.payment) {
        res.json({ success: false, message: "Payment already verified" });
      }
      //adding credits to your data on successful payment
      const userData = await User.findOne({ clerkId: paymentData.clerkId });
      const creditBalance = userData.creditBalance + paymentData.credits;
      await User.findByIdAndUpdate(userData._id, { creditBalance });

      //making payment status to true
      await Payment.findByIdAndUpdate(paymentData._id, { payment: true });

      res.json({ success: true, message: "Credits added successfully" });
    } else {
      res.json({
        success: false,
        message: "Payment Failed",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  ClerkWebhooks,
  getCreditBalance,
  paymentRazorPay,
  verifyRazorPayPayment,
};
