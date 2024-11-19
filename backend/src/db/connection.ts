import mysql2 from "mysql2"
import keys from '../keys';

const connection = mysql2.createConnection(keys);

export default connection; 