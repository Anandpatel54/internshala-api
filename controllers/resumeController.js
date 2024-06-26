const e = require("express");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErorrHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncErrors(async (req, res, next) => {
  const { resume } = await Student.findById(req.id).exec();
  res.json({ message: "Secure Resume page!", resume });
});

exports.addeducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Education Added!" });
});

exports.editeducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const eduIndex = student.resume.education.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.education[eduIndex] = {
    ...student.resume.education[eduIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Education updated!" });
});

exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filterededu = student.resume.education.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.education = filterededu;
  await student.save();
  res.json({ message: "Education deleted!" });
});

//---------------jobs---------------------

exports.addjob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "job Added!" });
});

exports.editjob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const jobIndex = student.resume.jobs.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.jobs[jobIndex] = {
    ...student.resume.jobs[jobIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "jobs updated!" });
});

exports.deletejob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filterededu = student.resume.jobs.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.jobs = filterededu;
  await student.save();
  res.json({ message: "jobs deleted!" });
});

//---------------internship---------------------------

exports.addinternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.internship.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "internship Added!" });
});

exports.editinternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const interIndex = student.resume.internship.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.internship[interIndex] = {
    ...student.resume.internship[interIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "internship updated!" });
});

exports.deleteinternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredinter = student.resume.internship.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.internship = filteredinter;
  await student.save();
  res.json({ message: "internship deleted!" });
});

//----------------------responsibilities--------------------

exports.addresponsibilities = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "responsibilities Added!" });
});

exports.editresponsibilities = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const respIndex = student.resume.responsibilities.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.responsibilities[respIndex] = {
    ...student.resume.responsibilities[respIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "responsibilities updated!" });
});

exports.deleteresponsibilities = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredresp = student.resume.responsibilities.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.responsibilities = filteredresp;
  await student.save();
  res.json({ message: "responsibilities deleted!" });
});

//---------------courses----------------------

exports.addcourses = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.courses.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "courses Added!" });
});

exports.editcourses = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const courIndex = student.resume.courses.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.courses[courIndex] = {
    ...student.resume.courses[courIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "courses updated!" });
});

exports.deletecourses = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredcour = student.resume.courses.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.courses = filteredcour;
  await student.save();
  res.json({ message: "courses deleted!" });
});

//---------------projects----------------------

exports.addprojects = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.projects.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "projects Added!" });
});

exports.editprojects = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const projIndex = student.resume.projects.findIndex(
    (i) => i.id !== req.params.eduid
  );
  student.resume.projects[projIndex] = {
    ...student.resume.projects[projIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "projects updated!" });
});

exports.deleteprojects = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredproj = student.resume.projects.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.projects = filteredproj;
  await student.save();
  res.json({ message: "projects deleted!" });
});

//---------------skills----------------------

exports.addskills = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.skills.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "skills Added!" });
});

exports.editskills = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const skillIndex = student.resume.skills.findIndex(
    (i) => i.id !== req.params.eduid
  );
  student.resume.skills[skillIndex] = {
    ...student.resume.skills[skillIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "skills updated!" });
});

exports.deleteskills = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredskill = student.resume.skills.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.skills = filteredskill;
  await student.save();
  res.json({ message: "skills deleted!" });
});

//---------------accomplishments-----------------

exports.addaccomplishments = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "accomplishments Added!" });
});

exports.editaccomplishments = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const accompIndex = student.resume.accomplishments.findIndex(
    (i) => i.id !== req.params.eduid
  );
  student.resume.accomplishments[accompIndex] = {
    ...student.resume.accomplishments[accompIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "accomplishments updated!" });
});

exports.deleteaccomplishments = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredaccomp = student.resume.accomplishments.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.accomplishments = filteredaccomp;
  await student.save();
  res.json({ message: "accomplishments deleted!" });
});