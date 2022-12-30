import express from "express";
import { emitWarning } from "process";
import {
  createTransaction,
  deleteTransactionByIds,
  getUserTransactionById,
} from "../models/transactionModel/TransactionModel.js";

const router = express.Router();

// using the post method to register the users into the database. we also have imported the exportablequery function creatyed in the moels

router.post("/", async (req, res, next) => {
  try {
    // getting the autorization which is the user id from the request

    const { authorization } = req.headers;

    const result = await createTransaction({
      ...req.body,
      userId: authorization,
    });
    result?._id
      ? res.json({
          status: "success",
          message: "The new user transaction has been added",
          result,
        })
      : res.json({
          status: "error",
          message: "cannot add the new transaction",
        });
  } catch (error) {
    // next(error);
    // WE will catch the error and do the handling here

    next(error);
  }
});

// using the post method to get the login

// router.post("/login", async (req, res, next) => {
//   try {
//     const result = await getUser(req.body);
//     console.log(result);

//     // The Optional Chaining Operator (?.) This
//     result?._id
//       ? res.json({
//           status: "success",
//           message: "Login is successful",
//           result: {
//             _id: result._id,
//             email: result.email,
//             name: result.name,
//           },
//         })
//       : res.json({
//           status: "error",
//           message: "Login is not successful",
//         });
//   } catch (error) {
//     next(error);
//   }
// });

// get user specific user transaction
router.get("/", async (req, res, next) => {
  try {
    // auth headers
    const { authorization } = req.headers;
    console.log(req.headers.authorization);
    // we are passing teh loggedUserId as the filter to get the records belonging to the user
    const result = await getUserTransactionById({ userId: authorization });
    // console.log(result);
    // we dont check the result contains the id or not because we the data stored is quite different
    res.json({
      status: "success",
      message: "The new user transaction has been added",
      result,
    });
  } catch (error) {
    // next(error);
    // WE will catch the error and do the handling here

    next(error);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    // auth headers
    const { authorization } = req.headers;
    // we are passing teh loggedUserId as the filter to get the records belonging to the user
    const { deletedCount } = await deleteTransactionByIds(
      req.body,
      authorization
    );
    // console.log(result);
    deletedCount
      ? // we dont check the result contains the id or not because we the data stored is quite different
        res.json({
          status: "success",
          message: deletedCount + "  transaction has been deleted",
        })
      : res.json({
          status: "error",
          message: "Nothing to delete",
        });
  } catch (error) {
    // next(error);
    // WE will catch the error and do the handling here

    next(error);
  }
});
export default router;
