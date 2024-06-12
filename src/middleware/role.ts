import type { Response, NextFunction } from "express"
import { CustomRequest } from "./jwt"

import { queries } from "../utils/queries";

export const roleAuthenticator =  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user_email = req.user_email as string;

    try {
        const {role} = await queries.getUserByEmail(user_email);
        if(role != 'admin') {
            res.status(403).json({
                message: "Forbidden",
            });
        };

        next();
    } catch (e: any) {
        console.error(e);
    };
}