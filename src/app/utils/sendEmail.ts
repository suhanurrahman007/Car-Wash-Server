import nodemailer from 'nodemailer'
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: 'suhanur35-448@diu.edu.bd',
      pass: 'dzso mgaz uwfv ubni',
    },
  });

  await transporter.sendMail({
    from: '"suhanur35-448@diu.edu.bd>',
    to,
    subject: 'Reset your password within 10m ✔',
    text: 'Plz Password Change for 10m?',
    html,
  });
};