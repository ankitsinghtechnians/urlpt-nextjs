'use server';

import nodemailer from 'nodemailer';
import { nanoid } from 'nanoid';
// import { tokenPage } from '../reset-password/tokenPage';

export async  function mailAction({ email }: { email: string },{ token }: { token: string }): Promise<void> {
  // const token = nanoid(32);
  // await tokenPage({token})?.toString

  // console.log('Generating token:', token); // Debug log for token generation

  const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER, 
      pass: process.env.MAIL_PASSWORD 
      // user: "erp@dev.technians.com",
      // pass: "$8?fbtt0.ZSA"
    },
   
  });

  console.log('Transport created'); // Debug log for transport creation

  const mailOptions = {
    from: 'erp@dev.technians.com',
    to: email,
    subject: 'Email verification',
    html: `
      <p>Please click on the following link to verify your email address:</p>
      <a href=" http://localhost:3000/auth/reset-password/${token}">
       
        http://localhost:3000/auth/reset-password/${token}

      </a>
    `,
  };

  try {
    console.log('Sending email to:', email); // Debug log for email sending
    const info = await transport.sendMail(mailOptions);
    
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error in sending email: ' + error);
  }
}
