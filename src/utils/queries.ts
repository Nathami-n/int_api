import {pool} from '../config/db';
const getUserByEmailQuery = "SELECT * FROM Users WHERE email  = $1";
const createNewUserQuery = "INSERt INTO Users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING * ";


const getUserByEmail = async (email: string) => {
    const user = await pool.query(getUserByEmailQuery, [email]);
    if(user.rows.length == 0) return null;
    return user.rows;
};

const createNewUser = async (arr: [name:string , email: string, password: string, role: string]) => {
   try {
    const user = await pool.query(createNewUserQuery, arr);
    return user;
   } catch (error: any) {
    console.error(error);
   }
};

export const queries = {getUserByEmail, createNewUser};
