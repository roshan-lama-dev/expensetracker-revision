import mongoose from "mongoose";
export const connectMongo = () => {
  try {
    const mongoUrl = "mongodb://127.0.0.1:27017/expense_tracker";
    mongoose.set("strictQuery", true);
    const connect = mongoose.connect(mongoUrl);
    connect && console.log("Mongo Db connection created");
  } catch (error) {
    console.log(error.message, "Error from mongo db");
  }
};
