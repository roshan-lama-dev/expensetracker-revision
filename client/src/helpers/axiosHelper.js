import axios from "axios";

// const baseUrl = "http://localhost:8000/api/v1";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "/api/v1"
    : "http://localhost:8000/api/v1";

const userApi = baseUrl + "/user";
const transactionApi = baseUrl + "/transaction";
// user api =============

//register users

export const postUser = async (obj) => {
  try {
    const { data } = await axios.post(userApi, obj);

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// login the user

export const getUser = async (obj) => {
  try {
    const { data } = await axios.post(userApi + "/login", obj);
    // console.log(data);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// try catch is used to catch the compile time error

// create a function that give us the userid from the sessionstorage
const getUserId = () => {
  const userStr = sessionStorage.getItem("user");

  const userObj = userStr ? JSON.parse(userStr) : null;
  return userObj?._id || null;
};

export const fetchTransaction = async () => {
  const userId = getUserId();
  if (!userId) {
    return {
      status: "error",
      message: "Please log in to see the transaction",
    };
  }
  try {
    const { data } = await axios.get(transactionApi, {
      headers: {
        Authorization: userId,
      },
    });
    // console.log(data);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postTransction = async (formdata) => {
  const userId = getUserId();
  if (!userId) {
    return {
      status: "error",
      message: "Please log in to post the transactions",
    };
  }
  try {
    const { data } = await axios.post(transactionApi, formdata, {
      headers: {
        Authorization: userId,
      },
    });
    // console.log(data);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteTransaction = async (ids) => {
  const userId = getUserId();
  if (!userId) {
    return {
      status: "error",
      message: "Please log in to see the transaction",
    };
  }
  try {
    const { data } = await axios.delete(transactionApi, {
      data: ids,
      headers: {
        Authorization: userId,
      },
    });
    // console.log(data);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
