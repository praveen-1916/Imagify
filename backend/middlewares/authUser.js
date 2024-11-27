import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      res.json({
        success: false,
        message: "Please authenticate with a valid token!",
      });
    } else {
      const token_decode = jwt.decode(token);
      console.log(token_decode.clerkId);
      req.body.clerkId = token_decode;
      next();
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
