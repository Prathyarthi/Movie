import mysql from 'mysql2/promise';
import { config } from 'dotenv';
config();

const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};
// console.log(dbConfig.user);

const connectToDb = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        console.log('Connected to MySQL database');
        return connection
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        throw error;
    }
}

export default connectToDb 
