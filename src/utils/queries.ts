import {pool} from '../config/db';
const getUserByEmailQuery = "SELECT * FROM Users WHERE email  = $1";


const getUserByEmail = async (email: string) => {
    const user = await pool.query(getUserByEmailQuery, [email]);
    if(user.rows.length == 0) return null;
    return user.rows;
};


export const queries = {getUserByEmail};
