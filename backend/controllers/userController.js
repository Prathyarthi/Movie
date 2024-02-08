import zod from 'zod'
import connectToDb from '../db/index.js'
import jwt from "jsonwebtoken";
import { config } from 'dotenv';
config();
import bcrypt from 'bcrypt'

const signupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})


const signup = async (req, res) => {

    const { username, email, password } = req.body;
    const connection = connectToDb()

    try {

        const signupParsed = signupSchema.safeParse(req.body)

        if (!signupParsed.success) {
            return res.status(400).json({
                success: false,
                message: "Every field is required "
            });
        }

        const [userTables] = await connection.query("SHOW TABLES LIKE 'USERS'");

        if (userTables.length === 0) {
            await connection.query(`
                CREATE TABLE USERS (
                    ID INT PRIMARY KEY AUTO_INCREMENT,
                    USERNAME VARCHAR(20),
                    EMAIL VARCHAR(20) UNIQUE,
                    PASSWORD VARCHAR(20)
                );
            `);
        }

        const userExists = (`SELECT * FROM USERS
        WHERE EMAIL=?
        `)

        const userExistsValues = [email]
        const [userExistsQuery] = await connection.query(userExists, userExistsValues);

        if (userExistsQuery.length > 0) {
            res.json({
                success: false,
                message: 'User already exists'
            });
        }
        else {
            const userQuery = (`
                INSERT INTO USERS (USERNAME,EMAIL,PASSWORD) VALUES (?,?,?,?)
            `)

            const userValues = [username, email, password]

            const user = await connection.query(userQuery, userValues)

            console.log("User created");
            if (!user) {
                return res.status(500).send("Server Error")
            }
        }


        const userId = user.id

        const token = jwt.sign({
            userId,
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            token: token,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: `Account already exist with the provided email ${email}`
        });
    }
};


const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
})


const signin = async (req, res, next) => {

    async function comparePassword(password) {
        return await bcrypt.compare(password, this.password)
    }

    const { email, password } = req.body;

    const signinParsed = signinSchema.safeParse(req.body)

    if (!signinParsed.success) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    try {
        const userExists = (`SELECT * FROM USERS
        WHERE EMAIL=?
        `)

        const userExistsValues = [email]
        const [userExistsQuery] = await connection.query(userExists, userExistsValues);

        if (userExistsQuery.length < 0) {
            res.status(400).json({
                success: false,
                message: "User doesn't exist"
            })
        }
        else {
            await bcrypt.hash(password, 10);
            const validPassword = await userExistsQuery.comparePassword(password)
            if (!validPassword) {
                return res.status(401).send("Password is incorrect")
            }
        }

        //     const token = jwt.sign({
        //         userId: userExists._id,
        //         role: userExists.role
        //     }, process.env.JWT_SECRET)

        //     res.cookie("token", token)

        //     res.status(200).json({
        //         success: true,
        //         message: "User logged in successfully",
        //         token: token,
        //         userExists
        //     })
        //     return
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export {
    signup,
    signin,
    getUser,
    logout
}