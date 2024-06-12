import type { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { queries } from "../utils/queries";
import { createJWT, hashPassword, verifyPassword } from "../utils/security";
import { sendEmail } from "../service/email";

const registerUser = async (req: Request, res: Response) => {
  const { email, password: pass, role, name } = req.body;

  if (!email || !pass || !role)
    return res.json({
      success: false,
      data: { body: null, error: "Please provide all the credentials" },
    });
  const password = hashPassword(pass);

  //check whether the user exists
  const user = await queries.getUserByEmail(email);
  if (user)
    return res.json({
      success: false,
      data: { body: null, error: "User already registered" },
    });
  try {
    //save the user to the database
    const newUser = await queries.createNewUser([name, email, password, role]);
    newUser.rows[0].password = null;

    //send the token
    if (!user) {
      await sendEmail(process.env.VERIFICATION_TOKEN, email);
    }

    return res.json({
      success: true,
      data: { body: newUser.rows[0], error: null },
    });
  } catch (e: any) {
    console.error(e.message);
    return res.json({ success: false, data: { body: null, error: e.message } });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.json({
      success: false,
      data: { body: null, error: "Please provide credentials" },
    });
  }

  const user = await queries.getUserByEmail(email);
  if (!user) {
    return res.json({
      succes: false,
      data: { body: null, error: "No user found, Please register" },
    });
  }

  try {
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid)
      return res.json({
        success: false,
        data: { body: null, error: "Invalid password" },
      });

    //generate the tokens
    const { refresh_token, access_token } = createJWT({
      user_id: user.id,
      user_email: user.email,
    });

    const { password: pass, ...rest } = user;

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .cookie("jwt", refresh_token, {
        ...options,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        data: { body: { user: rest, access_token }, error: null },
      });
  } catch (e: any) {
    console.error(e);
  }
};

const verifyToken = async (req: Request, res: Response) => {
    const token = req.params.token;
    try {
        if(token != process.env.VERIFICATION_TOKEN as string) return res.json({success: false, data: {error: "Invalid token"}});

        return res.json({success: true, data: {link: 'http://localhost:3000/api/v1/login'}});
    } catch (e: any) {
        console.error(e);
    }
}

export { registerUser, loginUser, verifyToken };
