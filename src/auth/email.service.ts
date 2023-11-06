import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
// import { OtpService } from './otp.service';

    @Injectable()
    export class EmailService {
    private readonly transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'abdullah.rajput715@gmail.com',
                pass: 'afgfhshkhsppvncu',
            },
        });
    } 
    generateOTP(): string {
        return crypto.randomBytes(2).toString('hex').toUpperCase();
        }

    async sendEmail(to: string, subject: string, text: string): Promise<any> {
        console.log(to);
        const otp = this.generateOTP(); 
        const mailOptions = {
            from: 'abdullah.rajput715@gmail.com',
            to: to,
            subject: 'Your OTP code',
            text :`Your OTP code is: ${otp}`,
        };
        // await this.transporter.sendMail(mailOptions); 
        try {
            await this.transporter.sendMail(mailOptions);
            return true; 
        } catch (error) {
        console.error('Error sending email:', error);
        return false; 
        }
    }
    }
