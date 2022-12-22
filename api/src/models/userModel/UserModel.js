import UserSchema from "./UserSchema.js";

// query to create a new user
export const createUser = (newUserObj) => {
  return UserSchema(newUserObj).save();
};

// get the user from the database
// login takes the req.body from the user which contains the email and password and compares that to the database

export const getUser = (whatever) => {
  return UserSchema.findOne(whatever);
};
