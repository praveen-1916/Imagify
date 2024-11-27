import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import imageRouter from "./routes/imageGeneration.js";
import authRouter from "./routes/authentication.js";
import connectToMongo from "./database.js";

const app = express();
const port = process.env.PORT || 3000;

connectToMongo();

//parse requests of content type - application/json
app.use(json());
//Middleware to access this server data from all origins
app.use(cors());

app.use("/3Dimage", imageRouter);
app.use("/api/user", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
