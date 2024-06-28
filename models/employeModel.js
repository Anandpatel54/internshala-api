const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeModel = new mongoose.Schema(
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
      select: false, // Ensure password is not returned in queries by default
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: [15, "Password must not exceed 15 characters"],
    },
    resetPasswordToken: {
      type: String,
      default: "0",
    },
    organizationname: {
      type: String,
      required: [true, "Organization Name is required"],
      minlength: [7, "Organization Name should be at least 7 characters"],
    },
    organizationlogo: {
      type: {
        fileId: { type: String, default: "" },
        url: {
          type: String,
          default:
            "https://images.unsplash.com/photo-1622396636133-ba43f812bc35?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      },
      default: {},
    },
    internship: [{ type: mongoose.Schema.Types.ObjectId, ref: "internship" }],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "jobs" }],
  },
  { timestamps: true }
);

//password decrypt
employeModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

employeModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//token generation
employeModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Employe = mongoose.model("employe", employeModel);
module.exports = Employe;
