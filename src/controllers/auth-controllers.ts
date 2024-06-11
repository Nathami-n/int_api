import type { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

import {queries} from '../utils/queries';
import { hashPassword } from "../utils/security";
import { sendEmail } from "../service/email";

const registerUser = async (req: Request, res: Response) => {
    const {email, password: pass, role, name} = req.body;

    if(!email || !pass || !role) return res.json({
        success: false,
        data: {body: null, error: "Please provide all the credentials"}
    });
    const password = hashPassword(pass);

    //check whether the user exists
    const user = await queries.getUserByEmail(email);
    if(user) return res.json({success: false, data: {body: null, error: "User already registered"}});
    try {
        //save the user to the database
        const newUser = await queries.createNewUser([name, email, password, role]);
        newUser.rows[0].password = null;

        //send the token
        await sendEmail(process.env.VERIFICATION_TOKEN, email);

        return res.json({success: true, data: {body: newUser.rows[0], error: null}});

    } catch(e: any) {
        console.error(e.message);
        return res.json({success: false, data: {body: null, error: e.message}});
    };
};


export {registerUser};