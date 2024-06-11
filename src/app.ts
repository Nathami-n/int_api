import {createServer} from "node:http";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const server = createServer(app);

import {corsOptions} from './config/cors';
import {PORT} from './config/connection';
import { authRouter } from "./routes/auth";
import { requestLogger } from "./middleware/reqLogger";


//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(requestLogger);


//routes

app.use('/api/v1', authRouter);


function main () {
    server.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    });
};

main();
