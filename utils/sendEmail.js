import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};



export default sendEmail;
