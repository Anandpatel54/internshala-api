const express = require("express");
const router = express.Router();
const {
  homepage,
  currentEmpploye,
  employesignup,
  employesignin,
  employesignout,
  employesendmail,
  employeforgetlink,
  employeresetpassword,
  employeupdate,
  employeavatar,
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");

//get/
router.get("/", homepage);

//POST/currentEmpploye
router.post("/", isAuthenticated, currentEmpploye);

//POST /Employe/signup routes
router.post("/signup", employesignup);

//POST /Employe/signin routes
router.post("/signin", employesignin);

//GET /Employe/signout routes
router.get("/signout", isAuthenticated, employesignout);

//POST /Employe/send-mail routes
router.post("/send-mail", employesendmail);

//GET/Employe/forget-link/:Employeid
router.get("/forget-link/:id", employeforgetlink);

//POST/Employe/reset-password/:Employeid
router.post("/reset-password/:id", isAuthenticated, employeresetpassword);

//POST /Employe/update/:Employeid routes
router.post("/update/:id", isAuthenticated, employeupdate);

//POST /Employe/avatar/:Employeid routes
router.post("/avatar/:id", isAuthenticated, employeavatar);

module.exports = router;
