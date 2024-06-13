import { NextFunction, Response} from "express";
import {CustomRequest} from '../middleware/jwt';

export const setUser = (res: Response, req: CustomRequest, next: NextFunction) => {
    const {role} = req.body;
    //set the request object

    req.user_role = role;

    next();
}