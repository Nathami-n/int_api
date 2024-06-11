import type { Request, Response } from "express";
import bcrypt from 'bcrypt';


import {queries} from '../utils/queries';

const registerUser = async (req: Request, res: Response) => {
    const {email, password: pass, role} = req.body;

    if(!email || !pass || !role) return res.json({
        success: false,
        data: {body: null, error: "Please provide all the credentials"}
    });

    const password = await bcrypt.hash(pass, 10);
    
    //check whether the user exists
    const user = await queries.getUserByEmail(email);
    if(user || user == null) return res.json({success: false, data: {body: null, error: "User already registered"}});

    try {
        //

    } catch(e: any) {
        console.error(e.message);
    }

    

};


export {registerUser};