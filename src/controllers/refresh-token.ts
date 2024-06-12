import type {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const refreshUserToken = (req: Request, res: Response) => {
    const refresh_token = req.cookies.jwt;

    if(!refresh_token) {
        return res.status(404).json({
            succcess: false,
            data: {
                body: null,
                error: "No refresh token available, please log in again"
            }
        })
    };

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string, (err, decoded) => {
        if(err) {
            if(err instanceof jwt.TokenExpiredError){
                return res.status(401).json({
                    success: false,
                    data: {
                        body: null,
                        error: "Token expired"
                    }
                })
            } else if (err instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({
                    success: false,
                    data: {
                        body: null,
                        error: "Invalid token"
                    }
                });
            
            } else {
                return res.status(500).json({
                    success: false,
                    data: {
                        body: null,
                        error: "Internal server error"
                    }

                });
            };
        }
    })


};