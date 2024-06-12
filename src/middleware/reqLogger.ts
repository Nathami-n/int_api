import { NextFunction, Request, Response } from "express";

import {logger} from '../utils/functions';
import { CustomRequest } from "./jwt";

export const requestLogger = (req: CustomRequest, res: Response, next: NextFunction) => {
    logger(`${req.method}\t ${req.url}\t ${req.headers.origin} \t ${req.user_email}`, "reqlog.txt");
    next();
};