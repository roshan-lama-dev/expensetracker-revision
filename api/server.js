import express from "express";
const app = express();
const PORT = 8000;

// catch the bad url
app.use("*", (req, res, next) => {
  // create an object that holds the status and message that could be forwarded to the next function
  const error = {
    errorCode: 404,
    message: "Page Not Found 404",
  };

  next(error);
});

app.use((error, req, res, next) => {
  try {
    const errorCode = error.errorCode || 500;
    res.status(errorCode).json({
      status: "error",
      message: error.message,
    });
    console.log(error);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
    console.log(error);
  }
});

app.listen(PORT, (error) => {
  error
    ? console.log("The server cannot run")
    : console.log(`The server is running at http://localhost:${PORT}`);
});
