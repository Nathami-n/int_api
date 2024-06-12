import { refreshUserToken } from "../controllers/refresh-token";
import {Router} from 'express';

export const refreshRouter = Router();

refreshRouter.post('/refresh', refreshUserToken);