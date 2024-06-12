import type {Request, Response} from 'express';
import { sendResetEmail } from '../service/email';
import { key } from '../temp/pass.config';
import crypto from 'crypto';

export const handleForgotPassword = async (req: Request, res: Response) => {
    const {email} = req.body;
    const cryptoToken = crypto.randomBytes(10).toString('hex');
    //update the dummy store
    key.update(cryptoToken);
    if(!email) {
        res.status(404).json({
            message: "Please provide your email"
        })
    };

    try {
        await sendResetEmail(email,key.pass);
        return res.json({
            success: true,
            message: "proceed to change password"
        });

    } catch(e: any) {
        console.log(e);
        return res.json({
            message: e.messsage
        })
    };

}