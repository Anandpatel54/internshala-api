const express = require("express");
const router = express.Router();
const {
  homepage,
  currentUser,
  Employesignup,
  Employesignin,
  Employesignout,
  Employesendmail,
  Employeforgetlink,
  Employeresetpassword,
  Employeupdate,
  Employeavatar,
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");

//get/
router.get("/", homepage);

//POST/Employe
router.post("/Employe", isAuthenticated, currentUser);

//POST /Employe/signup routes
router.post("/Employe/signup", Employesignup);

//POST /Employe/signin routes
router.post("/Employe/signin", Employesignin);

//GET /Employe/signout routes
router.get("/Employe/signout", isAuthenticated, Employesignout);

//POST /Employe/send-mail routes
router.post("/Employe/send-mail", Employesendmail);

//GET/Employe/forget-link/:Employeid
router.get("/Employe/forget-link/:id", Employeforgetlink);

//POST/Employe/reset-password/:Employeid
router.post("/Employe/reset-password/:id", isAuthenticated, Employeresetpassword);

//POST /Employe/update/:Employeid routes
router.post("/Employe/update/:id", isAuthenticated, Employeupdate);

//POST /Employe/avatar/:Employeid routes
router.post("/Employe/avatar/:id", isAuthenticated, Employeavatar);

module.exports = router;
