import mysql from 'promise-mysql';
import keys from './database';

const pool = mysql.createPool({
    host: 'db-web-integral-do-user-8918757-0.b.db.ondigitalocean.com',
    port: 25060,
    user: 'doadmin',
    password: 'AVNS_oIzxZOJQUiYVfXqyrib',
    database: 'defaultdb'
});
export default pool;