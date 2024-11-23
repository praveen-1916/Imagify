import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import imageGenerate from "./routes/imageGeneration.js";

const app = express();
const port = process.env.PORT || 3000;

//parse requests of content type - application/json
app.use(json());
//Middleware to access this server data from all origins
app.use(cors());

app.use("/3Dimage", imageGenerate);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
