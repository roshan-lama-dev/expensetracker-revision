import express from "express";
import { emitWarning } from "process";
import { createUser, getUser } from "../models/userModel/UserModel.js";

const router = express.Router();

// using the post method to register the users into the database. we also have imported the exportablequery function creatyed in the moels

router.post("/", async (req, res, next) => {
  try {
    const result = await createUser(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "The new user has been created",
          result,
        })
      : res.json({
          status: "error",
          message: "cannot create a new user",
        });
  } catch (error) {
    // next(error);
    // WE will catch the error and do the handling here
    if (error.message.includes("E11000 duplicate key error collection")) {
      (error.errorCode = 200),
        (error.message = "Please enter new email address");
    }
    next(error);
    console.log(error);
  }
});

// using the post method to get the login

router.post("/login", async (req, res, next) => {
  try {
    const result = await getUser(req.body);
    console.log(result);

    // The Optional Chaining Operator (?.) This
    result?._id
      ? res.json({
          status: "success",
          message: "Login is successful",
          result: {
            _id: result._id,
            email: result.email,
            name: result.name,
          },
        })
      : res.json({
          status: "error",
          message: "Login is not successful",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
