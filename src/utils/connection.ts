import mysql from 'promise-mysql';
import keys from './database';

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'web_integral'
});
export default pool;