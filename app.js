require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

// db connection
require("./models/database").connectDatabase();

//logger
const logger = require("morgan");
app.use(logger("tiny"));

//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieparser());

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
