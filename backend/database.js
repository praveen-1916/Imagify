import { connect } from "mongoose";

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);

const connectToMongo = async () => {
  await connect(mongoURI);
  console.log("connected");
};

export default connectToMongo;
