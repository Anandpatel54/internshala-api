const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employe = require("../models/employeModel");
const ErorrHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/sendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const { userInfo } = require("os");
const imagekit = require("../utils/imagekit").initImageeKit();

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Secure employe Homepage!" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  res.json({ employe });
});

exports.employesignup = catchAsyncErrors(async (req, res, next) => {
  const employe = await new Employe(req.body).save();
  sendtoken(employe, 201, res);
});

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!employe)
    return next(new ErorrHandler("User not found with email address", 404));

  const isMatch = employe.comparepassword(req.body.password);
  if (!isMatch) return next(new ErorrHandler("Wrong Credientials", 500));

  sendtoken(employe, 200, res);
});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signout!" });
});

exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email }).exec();

  if (!employe)
    return next(new ErorrHandler("User not found with email address", 404));

  const url = `${req.protocol}://${req.get("host")}/Employe/forget-link/${
    employe._id
  }`;

  sendmail(req, res, next, url);
  employe.resetPasswordToken = "1";
  await employe.save();
  res.json({ employe, url });
});

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id).exec();

  if (!employe)
    return next(new ErorrHandler("User not found with email address", 404));

  if (employe.resetPasswordToken == "1") {
    employe.resetPasswordToken = "0";
    employe.password = req.body.password;
    await employe.save();
  } else {
    return next(
      new ErorrHandler("Invalid Reset Password Link! please Try Again", 500)
    );
  }

  res.status(200).json({ messag: "password has been successfully changed" });
});

exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  employe.password = req.body.password;
  await employe.save();

  sendtoken(employe, 201, res);
});

exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
  await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "Employe updated successfully!",
  });
});

exports.employeavatar = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id).exec();
  const file = req.files.avatar;
  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;
  if(employe.avatar.fileId !== ""){
    await imagekit.deleteFile(Employe.avatar.fileId)
  }


  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  employe.avatar = { fileId, url };
  await employe.save();
  res.status(200).json({
    success: true,
    message: "Profile updated successfully!",
  });
});
