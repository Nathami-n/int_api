import { handleProtectedRoute } from "../controllers/protected";

import {Router} from 'express';

export const protectedRoute = Router();


protectedRoute.get("/", handleProtectedRoute);