import {Router} from 'express';
import {registerUser, loginUser, verifyToken, resetUserPassword} from '../controllers/auth-controllers';
import { handleForgotPassword } from '../controllers/forgot-pass';
export const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/verify/:token', verifyToken);
authRouter.post('/resert/:token/:email', resetUserPassword);
authRouter.route("/forgotpassword").post(handleForgotPassword);