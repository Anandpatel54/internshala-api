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
  addresponsibilities,
  editresponsibilities,
  deleteresponsibilities,
  addcourses,
  editcourses,
  deletecourses,
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

//----------responsibilities----------------------

//POST
router.post("/add-responsibilities", isAuthenticated, addresponsibilities);

//POST
router.post("/edit-responsibilities/:eduid", isAuthenticated, editresponsibilities);

//POST
router.post("/delete-responsibilities/:eduid", isAuthenticated, deleteresponsibilities);

//---------------courses----------------------

router.post("/add-courses", isAuthenticated, addcourses);

//POST
router.post("/edit-courses/:eduid", isAuthenticated, editcourses);

//POST
router.post("/delete-courses/:eduid", isAuthenticated, deletecourses);

module.exports = router;
