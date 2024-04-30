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
  addprojects,
  editprojects,
  deleteprojects,
  addskills,
  editskills,
  deleteskills,
  addaccomplishments,
  editaccomplishments,
  deleteaccomplishments,

} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");

//get/
router.get("/", isAuthenticated, resume);

//POST/
router.post("/add-edu", isAuthenticated, addeducation);

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

//----------------projects------------------

router.post("/add-projects", isAuthenticated, addprojects);

//POST
router.post("/edit-projects/:eduid", isAuthenticated, editprojects);

//POST
router.post("/delete-projects/:eduid", isAuthenticated, deleteprojects);

//------------------skills--------------------

router.post("/add-skills", isAuthenticated, addskills);

//POST
router.post("/edit-skills/:eduid", isAuthenticated, editskills);

//POST
router.post("/delete-skills/:eduid", isAuthenticated, deleteskills);

//----------------accomplishments------------------

router.post("/add-accomplishments", isAuthenticated, addaccomplishments);

//POST
router.post("/edit-accomplishments/:eduid", isAuthenticated, editaccomplishments);

//POST
router.post("/delete-accomplishments/:eduid", isAuthenticated, deleteaccomplishments);

module.exports = router;
