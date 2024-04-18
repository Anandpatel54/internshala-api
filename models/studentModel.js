const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      minlength: [5, "First Name should be at least 5 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [5, "Last Name should be at least 5 characters"],
    },

    contact: {
      type: String,
      required: [true, "Contact is required"],
      maxlength: [10, "Contact must not exceed 10 characters"],
      minlength: [10, "Contact must be at least 10 characters"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      minlength: [4, "City should be at least 4 characters"],
    },
    gender: { type: String, enum: ["Male", "Female", "Others"] },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      select: false,
      maxlength: [15, "password must be at least 15 characters"],
      minlength: [6, "password must be at least 6 characters"],
      // match: []
    },
    resetPasswordToken: {
      type: String,
      default: "0",
    },
    avatar: {
      type: Object,
      default: {
        filed: "",
        url: "https://images.unsplash.com/photo-1622396636133-ba43f812bc35?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
  },
  { timestamps: true }
);

//password decrypt
studentModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

studentModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//token generation
studentModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Student = mongoose.model("student", studentModel);
module.exports = Student;
