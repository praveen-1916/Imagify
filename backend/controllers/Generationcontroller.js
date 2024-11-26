import FormData from "form-data";
import axios from "axios";

const Generation = async (req, res) => {
  try {
    const { prompt } = req.body;
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
      res.json({
        success: true,
        message: "Image Genarated Successfully",
        resultImage,
      });
    } else {
      res.json({ success: false, message: "Please provide a valid prompt" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { Generation };
