import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

 export interface CustomRequest extends Request {
    user_id?: string | JwtPayload,
    user_email?: string |JwtPayload,
    user_role?: string,
    cookies: {
        jwt: string;
    }
};

export const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction ) => {
    const reqheaders = req.headers.authorization as string || req.headers["Authorization"] as string || req.headers['authorization'] as string;
    console.log(reqheaders);

    const token = reqheaders.split(' ')[1];

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
     jwt.verify(token, process.env.ACCESS_TOKEN as string, (err, decoded: {user_id: string, user_email: string}) => {
        if(err){
            if (err instanceof jwt.TokenExpiredError){
                return res.status(401).json({
                    success: false,
                    data: {
                        body: null,
                        error: "Token expired",
                    }
                });
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
    };
       req.user_id = decoded.user_id;
        req.user_email = decoded.user_email;
        next();
     });

}