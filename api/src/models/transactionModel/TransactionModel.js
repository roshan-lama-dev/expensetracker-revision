import TransactionSchema from "./TransactionSchema.js";

// query to create a new user
export const createTransaction = (newUserObj) => {
  return TransactionSchema(newUserObj).save();
};

// get the user from the database
// login takes the req.body from the user which contains the email and password and compares that to the database

// query to get all the transaction according to the user ID
export const getUserTransactionById = (filter) => {
  return TransactionSchema.find(filter);
};

// delete the transaction as per the userID and the  id of the transaction that are to be deleted
export const deleteTransactionByIds = (idArg, userId) => {
  return TransactionSchema.deleteMany({
    // first looks for the existance  of the userId the
    // checks whether there is transaction id is whether inside the transcation id passed from the users

    _id: { $in: idArg },
    userId,
  });
};
