import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import {pool} from '../config/db';

import {queries} from '../utils/queries';

const registerUser = async (req: Request, res: Response) => {
    const {email, password: pass, role} = req.body;

    if(!email || !pass || !role) return res.json({
        success: false,
        data: {body: null, error: "Please provide all the credentials"}
    });

    const password = await bcrypt.hash(pass, 10);
    
    //check whether the user exists
    const user = pool.query(queries.getUserByEmail, [email], (err, result) => {
        if(err) throw err;
        return res.json({user: result.rows});
    });

    

};


export {registerUser};