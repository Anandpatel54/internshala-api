const express = require("express");
const router = express.Router();
const {
  resume,
  addeducation,
  editeducation,
  deleteeducation,
  addjob,
  editjob,
  deletejob,
  addinternship,
  editinternship,
  deleteinternship,
} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");

//get/
router.get("/", isAuthenticated, resume);

//POST/
router.post("/add-adu", isAuthenticated, addeducation);

//POST
router.post("/edit-edu/:eduid", isAuthenticated, editeducation);

//POST
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation);

//------------------Job-----------------

//POST
router.post("/add-job", isAuthenticated, addjob);

//POST
router.post("/edit-job/:eduid", isAuthenticated, editjob);

//POST
router.post("/delete-job/:eduid", isAuthenticated, deletejob);

  //---------------internship---------------------------

  //POST
router.post("/add-internship", isAuthenticated, addinternship);

//POST
router.post("/edit-internship/:eduid", isAuthenticated, editinternship);

//POST
router.post("/delete-internship/:eduid", isAuthenticated, deleteinternship);



module.exports = router;
