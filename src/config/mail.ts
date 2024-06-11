import { createTransport } from "nodemailer";
import dotenv from 'dotenv';
import {google} from 'googleapis';
dotenv.config();

const OAuth2 = google.auth.OAuth2;

export const authClient = new OAuth2(process.env.CLIENT_ID as string, process.env.CLIENT_SECRET as string);

export const transporter = createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: process.env.SUPER_USER,
        clientId: process.env.CLIENT_ID as string,
        clientSecret: process.env.CLIENT_SECRET as string
    }
});