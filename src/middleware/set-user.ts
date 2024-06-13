import { NextFunction, Response} from "express";
import {CustomRequest} from '../middleware/jwt';

export const setUser = ( req: CustomRequest, res: Response, next: NextFunction) => {
    const {role} = req.body;
    //set the request object

    req.user_role = role;

    next();
}