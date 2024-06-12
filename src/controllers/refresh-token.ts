import {type Request, type Response} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {queries} from '../utils/queries';
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

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string, async (err: jwt.VerifyErrors, decoded: {user_id: string, user_email: string}) => {
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
        };

        //no error
        //fetch user
        const user = await queries.getUserByEmail(decoded.user_email);
         const access_token = jwt.sign({user_id: user.id, user_email: user.email}, process.env.ACCESS_token, {expiresIn: "30m"});
        const {password: pass, ...rest} = user;

        res.status(200).json({
            success: true,
            data: {
                body: {
                    user: rest,
                    access_token: access_token
                },
                error: null
            },
        });

    });
};