import { Webhook } from "svix";
import User from "../models/UserModel.js";

// API controller function to manage clerk user with database

//https://imagify-backend-xmu3.onrender.com/api/user/webhook

const ClerkWebhooks = async (req, res) => {
  try {
    const clerkWebhookSecret = process.env.CLERL_WEBHOOK_SECRET;
    const whook = new Webhook(clerkWebhookSecret);

    await whook.verify(req.body, {
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
          email: data.email_addresses[0].email_addresses,
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
          email: data.email_addresses[0].email_addresses,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };

        await User.findByIdAndUpdate({ clerkId: data.id }, userUpdateDetails);
        res.json({ success: true, message: "Account Created Successfully" });

        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete({ clerkId: data.id });
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

export { ClerkWebhooks };
