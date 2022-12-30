import mongoose from "mongoose";
export const connectMongo = () => {
  try {
    const mongoUrl = process.env.MONGO_CLIENT;
    const connect = mongoose.connect(mongoUrl);
    connect && console.log("Mongo Db connection created");
  } catch (error) {
    console.log(error.message, "Error from mongo db");
  }
};
