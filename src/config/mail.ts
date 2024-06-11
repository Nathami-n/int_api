import { createTransport } from "nodemailer";

export const transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.SUPER_USER,
        pass: process.env.USER_PASS,
    }
});