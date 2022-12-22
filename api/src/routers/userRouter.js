import express from "express";
import { emitWarning } from "process";
import { createUser, getUser } from "../models/UserModel.js";

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
    next(error);
  }
});

// using the post method to get the login

router.post("/login", async (req, res, next) => {
  try {
    const result = await getUser(req.body);
    console.log(result);

    // The Optional Chaining Operator (?.) This
    result?._id
      ? console.log("login Sucessfull")
      : console.log("Login is not sucess");
  } catch (error) {
    next(error);
  }
});

export default router;
