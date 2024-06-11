import {Pool} from 'pg';

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5433,
    password: process.env.PASSWORD as string,
    database: "testdb",
});