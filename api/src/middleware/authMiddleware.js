import { getUser } from "../models/userModel/UserModel.js";

export const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // check if the users exist with the help of headers with conatins the uerID
    const user = await getUser({ _id: authorization });
    if (user?._id) {
      return next();
    }
    res.json({
      status: "Error",
      message: "Unathorixed",
    });
  } catch (error) {
    next(error);
  }
};
