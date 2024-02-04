import mysql from 'mysql2/promise';
import { config } from 'dotenv'
config()

const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};

const connectToDb = async () => {
    try {
        await mysql.createConnection(dbConfig)
            .then(() => {
                console.log('Connected to MySQL database');
            })
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        throw error;
    }
}

export default connectToDb 
