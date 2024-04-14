const nodemailer = require("nodemailer");
const ErorrHandler = require("./ErrorHandler");

exports.sendmail = (req, res, url, next) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    post: 465,
    auth: {
      user: process.env.MAIL_EMAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Anand Pvt. Ltd.",
    to: req.body.email,
    subject: "Password Reset Link",
    //text: "Do not share this link to anyone",
    html: `
    <h1>Click link below to reset password</h1>
    <a href="${url}">Password Reset Link</a>
`,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) return next(new ErorrHandler(err, 500));
    console.log(info);
    return res.status(200).json({
      message: "Email sent successfully",
      url,
    });
  });
};
