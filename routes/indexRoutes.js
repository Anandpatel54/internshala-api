const express = require("express");
const router = express.Router();
const {
  homepage,
  currentUser,
  studentsignup,
  studentsignin,
  studentsignout,
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");

//get/
router.get("/", homepage);

//POST/student
router.post("/student",isAuthenticated, currentUser);

//POST /student/signup routes
router.post("/student/signup", studentsignup);

//POST /student/signin routes
router.post("/student/signin", studentsignin);

//GET /student/signout routes
router.get("/student/signout",isAuthenticated, studentsignout);

module.exports = router;
