import { Response } from "express";
import { CustomRequest } from "../middleware/jwt";

export const handleProtectedRoute = (req: CustomRequest, res: Response) => {
    const role = req?.user_role as string;

    if(role != 'admin') return res.status(403).json({
        message: "forbidden"
    });

    return res.json({
        message: "Allowed",
    });
}