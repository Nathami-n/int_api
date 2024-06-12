import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user_id: string,
    user_email: string,
    cookies: {
        jwt: string;
    }
};

export const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction ) => {
    const token = req.headers.authorization;
    console.log(token);
    if(!token) {
        return res.status(404).json({
            success: false,
            data: {
                body: null,
                error: "Not token provided"
            }
        })
    };
    //decode the token
     jwt.verify(token, process.env.ACCESS_TOKEN as string, (err, decoded)=> {
        if (err) {
            if (err instanceof jwt.TokenExpiredError){
                return res.status(401).json({
                    success: false,
                    data: {
                        body: null,
                        error: "Token expired",
                    }
                })
            };
        } else if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                data: {
                    body: null,
                    error: "Invalid token"
                }
            })
        } else {
            return res.status(500).json({
                success: false,
                data: {
                    body: null,
                    error: "Server Error"
                },
            });
        }; 
     });
}