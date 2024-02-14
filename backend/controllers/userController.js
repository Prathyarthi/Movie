import zod from 'zod'
import connectToDb from '../db/index.js'
import jwt from "jsonwebtoken";
import { config } from 'dotenv';
config();

const signupSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})


const signup = async (req, res) => {

    const { username, email, password } = req.body;
    const connection = await connectToDb()

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
                INSERT INTO USERS (USERNAME,EMAIL,PASSWORD) VALUES (?,?,?)
            `)

            const userValues = [username, email, password]

            const [user] = await connection.query(userQuery, userValues)

            console.log("User created");
            if (!user) {
                return res.status(500).send("Server Error")
            }
            const userId = user.insertId
            console.log(userId);

            const token = jwt.sign({
                userId,
            }, process.env.JWT_SECRET)

            res.cookie("token", token, { httpOnly: true })

            const newUser = (`SELECT USERNAME,EMAIL FROM USERS
        WHERE ID=?
        `)

            const newUserValues = [userId]
            const [newUserQuery] = await connection.query(newUser, newUserValues);

            return res.status(200).json({
                success: true,
                message: "User created successfully",
                token: token,
                newUserQuery
            })
        }
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

    const { email, password } = req.body;

    const connection = await connectToDb()

    const signinParsed = signinSchema.safeParse(req.body)

    if (!signinParsed.success) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    try {
        const userExists = (`SELECT EMAIL,PASSWORD,ID FROM USERS
        WHERE EMAIL=?
        `)

        const userExistsValues = [email]
        const [userExistsQuery] = await connection.query(userExists, userExistsValues);

        if (userExistsQuery.length === 0) {
            res.status(400).json({
                success: false,
                message: "User doesn't exist"
            })
        }

        if (password !== userExistsQuery[0].PASSWORD) {
            return res.status(401).send("Password is incorrect")
        }

        const token = jwt.sign({
            userId: userExistsQuery[0].ID,
        }, process.env.JWT_SECRET)

        res.cookie("token", token, { httpOnly: true })

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token,
            userExistsQuery
        })
        return

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


const getUser = async (req, res) => {
    const userId = req.userId;
    // console.log(userId);
    const connection = await connectToDb()
    try {
        const [user] = await connection.query(`SELECT USERNAME , EMAIL FROM USERS WHERE ID=${userId}`)

        // console.log(user[0].USERNAME);

        if (!user) {
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            user: user[0]
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token")

        res.status(200).json({
            success: true,
            message: "Logout successfull"
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
}

export {
    signup,
    signin,
    getUser,
    logout
}