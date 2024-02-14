import jwt from "jsonwebtoken";
import { config } from "dotenv"
config()

const isLoggedIn = async (req, res, next) => {

    const token = (req.cookies && req.cookies.token) || null;
    // const token = req.cookies.token
    console.log(token);
    if (!token) {
        res.status(400).json({
            success: false,
            message: "Could not find token"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded.userId);
        if (decoded.userId) {
            req.userId = decoded.userId;
            return next();
        }

    } catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            message: "Unauthorized, please login to continue"
        })
    }
    // try {
    //     const token = req.cookies.token
    //     console.log(token);
    //     if (!token) {
    //         res.status(400).json({
    //             success: false,
    //             message: "Could not find token"
    //         })
    //     }

    //     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    //     // req.user = decodedToken.user;
    //     req.userId = decodedToken.userId;
    //     // console.log("User :", user);
    //     // console.log(req.user);
    //     next()
    // } catch (error) {
    //     console.log(error);
    // }
};

const adminMiddleware = (...roles) =>
    async (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            res.status(400).json({
                success: false,
                message: "Unauthorized, please login to continue"
            })
        }

        try {
            const decodedRole = jwt.verify(token, process.env.JWT_SECRET);

            if (!decodedRole.role) {
                res.status(400).json({
                    success: false,
                    message: "Role information not found in the token"
                })
            }

            req.user = req.user || {};

            req.user.role = decodedRole.role;
            console.log(req.user.role);

            if (!roles.includes(req.user.role)) {
                res.status(403).json({
                    success: false,
                    message: "You don't have permission to access this route"
                })
            }

            next();
        } catch (err) {
            res.status(403).json({
                success: false,
                message: "Could not verify the token"
            })
        }
    };


export {
    isLoggedIn,
    adminMiddleware
}
