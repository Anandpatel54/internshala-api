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
    student.resume.education = filterededu
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
  const eduIndex = student.resume.jobs.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.jobs[eduIndex] = {
    ...student.resume.jobs[eduIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "job updated!" });
});

exports.deletejob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.jobs.filter(
      (i) => i.id !== req.params.eduid
    );
    student.resume.jobs = filterededu
    await student.save();
    res.json({ message: "job deleted!" });
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
    const eduIndex = student.resume.internship.findIndex(
      (i) => i.id === req.params.eduid
    );
    student.resume.internship[eduIndex] = {
      ...student.resume.internship[eduIndex],
      ...req.body,
    };
    await student.save();
    res.json({ message: "internship updated!" });
  });
  
  exports.deleteinternship = catchAsyncErrors(async (req, res, next) => {
      const student = await Student.findById(req.id).exec();
      const filterededu = student.resume.internship.filter(
        (i) => i.id !== req.params.eduid
      );
      student.resume.internship = filterededu
      await student.save();
      res.json({ message: "internship deleted!" });
    });