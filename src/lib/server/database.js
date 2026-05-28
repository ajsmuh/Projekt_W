// Import MySQL package with promise support
import mysql from 'mysql2/promise';

// Import database environment variables
import {
    DB_NAME,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT
} from '$env/static/private';

// Create MySQL connection pool
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
});

export default pool;