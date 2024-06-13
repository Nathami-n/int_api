import { handleProtectedRoute } from "../controllers/protected";
import {setUser} from '../middleware/set-user';

import {Router} from 'express';

export const protectedRoute = Router();


protectedRoute.get("/", setUser, handleProtectedRoute);