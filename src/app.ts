import {createServer} from "node:http";
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const server = createServer(app);

import {corsOptions} from './config/cors';
import {PORT} from './config/connection';
import { authRouter } from "./routes/auth";
import { requestLogger } from "./middleware/reqLogger";
import {verifyJWT} from './middleware/jwt';
import {refreshRouter} from './routes/refresh';
import { roleAuthenticator } from "./middleware/role";
import {protectedRouter} from './routes/protected.route';

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(requestLogger);


//routes

app.use('/api/v1', authRouter);
app.use('/token', refreshRouter);
 
//route for demonstrating role based access and jwt
app.use('/jwtdemo',verifyJWT, roleAuthenticator ,(req: Request, res: Response)=> {
     return res.json({message: "will show if token has not expired and user is admin"});
});
app.use("/admin", protectedRouter);


(function main () {
    server.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    });
})();

