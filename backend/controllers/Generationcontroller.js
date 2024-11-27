import FormData from "form-data";
import axios from "axios";
import User from "../models/UserModel";
// import User from "../models/UserModel.js";

const Generation = async (req, res) => {
  try {
    const { prompt, clerkId } = req.body;
    const user = await User.findOne(clerkId);
    if (!user) {
      res.json({ success: false, message: "User not found in our database" });
    }
    if (user.creditBalance === 0) {
      res.json({ success: false, message: "Insufficient credits" });
    }

    if (prompt) {
      const formData = new FormData();
      formData.append("prompt", prompt);
      const { data } = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        formData,
        {
          headers: {
            "x-api-key": process.env.YOUR_API_KEY,
          },
          responseType: "arraybuffer",
        }
      );
      const base64Image = Buffer.from(data, "binary").toString("base64");
      const resultImage = `data:image/png;base64,${base64Image}`;
      await User.findByIdAndUpdate(user._id, {
        creditBalance: user.creditBalance - 1,
      });
      res.json({
        success: true,
        message: "Image Genarated Successfully",
        resultImage,
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { Generation };
