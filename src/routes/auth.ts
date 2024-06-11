import {Router} from 'express';
import {registerUser} from '../controllers/auth-controllers';
export const authRouter = Router();

authRouter.post('/register', registerUser);