import axios from "axios";

const baseUrl = "http://localhost:8000/api/v1";
const userApi = baseUrl + "/user";
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
    console.log(data);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

// try catch is used to catch the compile time error
