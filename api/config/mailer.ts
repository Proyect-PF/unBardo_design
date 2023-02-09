import nodemailer = require("nodemailer");
import dotenv = require("dotenv");
dotenv.config();
export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.email, // generated ethereal user
    pass: process.env.password, // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});
