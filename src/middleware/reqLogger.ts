import { NextFunction, Request, Response } from "express";

import {logger} from '../utils/functions';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    logger(`${req.method}\t ${req.url}\t ${req.headers.origin}`, "reqlog.txt");
    next();
};