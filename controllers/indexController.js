const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErorrHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/sendToken");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Secure Homepage!" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  res.json({ student });
});


exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendtoken(student, 201, res);
});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!student)
    return next(new ErorrHandler("User not found with email address", 404));

  const isMatch = student.comparepassword(req.body.password);
  if (!isMatch) return next(new ErorrHandler("Wrong Credientials", 500));

  sendtoken(student, 200, res);
});

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token")
  res.json({message: "successfully signout!"})
});
