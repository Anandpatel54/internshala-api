const express = require("express");
const router = express.Router();
const {
  homepage,
  currentUser,
  studentsignup,
  studentsignin,
  studentsignout,
  studentsendmail,
  studentforgetlink,
  studentresetpassword,
  studentupdate,
  studentavatar,
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");

//get/
router.get("/", homepage);

//POST/student
router.post("/student", isAuthenticated, currentUser);

//POST /student/signup routes
router.post("/student/signup", studentsignup);

//POST /student/signin routes
router.post("/student/signin", studentsignin);

//GET /student/signout routes
router.get("/student/signout", isAuthenticated, studentsignout);

//POST /student/send-mail routes
router.post("/student/send-mail", studentsendmail);

//GET/student/forget-link/:studentid
router.get("/student/forget-link/:id", studentforgetlink);

//POST/student/reset-password/:studentid
router.post("/student/reset-password/:id", isAuthenticated, studentresetpassword);

//POST /student/update/:studentid routes
router.post("/student/update/:id", isAuthenticated, studentupdate);

//POST /student/avatar/:studentid routes
router.post("/student/avatar/:id", isAuthenticated, studentavatar);

module.exports = router;
