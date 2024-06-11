import {transporter} from '../config/mail';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async ( token: string, email: string) => {
    const emailOptions = {
        from: process.env.SUPER_USER,
        to: email,
        subject: "verification of email",
        text:`http://localhost:3000/api/v1/verify/${token}`
    };

    await transporter.sendMail(emailOptions);
};


export const sendResetEmail = async (email: string, token: string ) => {
    const emailOptions = {
        from: process.env.SUPER_USER,
        to: email,
        subject: "verification of email",
        text:`http://localhost:3000/api/v1/reset/${token}`
    };
    await transporter.sendMail(emailOptions);
}
