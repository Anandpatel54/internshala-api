require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

//logger
const logger = require("morgan");
app.use(logger("tiny"));

//routes
app.use("/", require("./routes/indexRoutes"));

// error handling
const ErorrHandler = require("./utils/ErrorHandler");
const { genetatedErrors } = require("./middlewares/errors");
app.all("*", (req, res, next) => {
  next(new ErorrHandler(`Requesred URL Not Found ${req.url}`, 404));
});
app.use(genetatedErrors);

app.listen(
  process.env.PORT,
  console.log(`server running on port ${process.env.PORT}`)
);
