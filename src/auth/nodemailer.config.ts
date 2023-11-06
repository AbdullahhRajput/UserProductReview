import * as nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  // Configure SMTP settings for your email service provider
});