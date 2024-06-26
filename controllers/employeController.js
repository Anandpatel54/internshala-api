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
  const Employe = await Employe.findById(req.id).exec();
  res.json({ Employe });
});

exports.Employesignup = catchAsyncErrors(async (req, res, next) => {
  const Employe = await new Employe(req.body).save();
  sendtoken(Employe, 201, res);
});

exports.Employesignin = catchAsyncErrors(async (req, res, next) => {
  const Employe = await Employe.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!Employe)
    return next(new ErorrHandler("User not found with email address", 404));

  const isMatch = Employe.comparepassword(req.body.password);
  if (!isMatch) return next(new ErorrHandler("Wrong Credientials", 500));

  sendtoken(Employe, 200, res);
});

exports.Employesignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signout!" });
});

exports.Employesendmail = catchAsyncErrors(async (req, res, next) => {
  const Employe = await Employe.findOne({ email: req.body.email }).exec();

  if (!Employe)
    return next(new ErorrHandler("User not found with email address", 404));

  const url = `${req.protocol}://${req.get("host")}/Employe/forget-link/${
    Employe._id
  }`;

  sendmail(req, res, next, url);
  Employe.resetPasswordToken = "1";
  await Employe.save();
  res.json({ Employe, url });
});

exports.Employeforgetlink = catchAsyncErrors(async (req, res, next) => {
  const Employe = await Employe.findById(req.params.id).exec();

  if (!Employe)
    return next(new ErorrHandler("User not found with email address", 404));

  if (Employe.resetPasswordToken == "1") {
    Employe.resetPasswordToken = "0";
    Employe.password = req.body.password;
    await Employe.save();
  } else {
    return next(
      new ErorrHandler("Invalid Reset Password Link! please Try Again", 500)
    );
  }

  res.status(200).json({ messag: "password has been successfully changed" });
});

exports.Employeresetpassword = catchAsyncErrors(async (req, res, next) => {
  const Employe = await Employe.findById(req.id).exec();
  Employe.password = req.body.password;
  await Employe.save();

  sendtoken(Employe, 201, res);
});

exports.Employeupdate = catchAsyncErrors(async (req, res, next) => {
  await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "Employe updated successfully!",
  });
});

exports.Employeavatar = catchAsyncErrors(async (req, res, next) => {
  const Employe = await Employe.findById(req.params.id).exec();
  const file = req.files.avatar;
  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;
  if(Employe.avatar.fileId !== ""){
    await imagekit.deleteFile(Employe.avatar.fileId)
  }


  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  Employe.avatar = { fileId, url };
  await Employe.save();
  res.status(200).json({
    success: true,
    message: "Profile updated successfully!",
  });
});
