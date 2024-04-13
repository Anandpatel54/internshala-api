const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "homepage" });
});

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  res.status(202).json(student);
});
