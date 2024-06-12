import {pool} from '../config/db';
const getUserByEmailQuery = "SELECT * FROM Users WHERE email  = $1";
const createNewUserQuery = "INSERT INTO Users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING * ";
const updateUserQuery = "UPDATE Users SET password = $1 WHERE email = $2 RETURNING name, email, role";


const getUserByEmail = async (email: string) => {
    const user = await pool.query(getUserByEmailQuery, [email]);
    if(user.rows.length == 0) return null;
    return user.rows[0];
};

const createNewUser = async (arr: [name:string , email: string, password: string, role: string]) => {
   try {
    const user = await pool.query(createNewUserQuery, arr);
    return user;
   } catch (error: any) {
    console.error(error);
   }
};

const updateUser = async (arr:[password: string, email: string]) => {
    const user = await pool.query(updateUserQuery, arr);
    if(user.rows.length == 0) return null;
    return user.rows[0];
};

export const queries = {getUserByEmail, createNewUser, updateUser};
