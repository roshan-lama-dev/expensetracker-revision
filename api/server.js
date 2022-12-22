import express from "express";
import { connectMongo } from "./src/config/dbConfig.js";
const app = express();
const PORT = process.env.PORT || 8000;
import cors from "cors";
import morgan from "morgan";
import userRouter from "./src/routers/userRouter.js";
// importing middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// connect to the mongo db
connectMongo();

//create a url endpoint and reroute the request made to userRouter
app.use("/api/v1/user", userRouter);

// catch the bad url
app.use("*", (req, res, next) => {
  // create an object that holds the status and message that could be forwarded to the next function
  const error = {
    errorCode: 404,
    message: "Page Not Found 404",
  };

  next(error);
});

// global error handling
app.use((error, req, res, next) => {
  try {
    const errorCode = error.errorCode || 500;
    res.status(errorCode).json({
      status: "error",
      message: error.message,
      errorCode: errorCode,
      location: "from the catch 404",
    });
    console.log(error);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      location: "from the 500 error",
    });
    console.log(error, "from the catch 500");
  }
});

app.listen(PORT, (error) => {
  error
    ? console.log("The server cannot run")
    : console.log(`The server is running at http://localhost:${PORT}`);
});
