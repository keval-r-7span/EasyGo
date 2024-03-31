import jwt from "jsonwebtoken";
import { JWT } from "../helper/constants";
import logger from "../utils/logger";
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || req.headers["Authorization"];
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token) {
            return res.json({
                success: false,
                messaage: "No Token Found",
            });
        }
        try {
            const decode = jwt.verify(token, JWT.SECRET);
            if (!decode.role) {
                return res.json({
                    success: false,
                    message: "Unable to Decode Token",
                });
            }
            req.user = decode;
            next();
        }
        catch (error) {
            logger.error(error);
            return res.json({
                success: false,
                message: "Error occured at verifying Token",
            });
        }
    }
    catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            message: "Error occured at verifying Token",
        });
    }
};
const isDriver = (req, res, next) => {
    try {
        if (req.user.role !== "driver") {
            return res.json({
                success: false,
                message: "Protected routes for driver only",
            });
        }
        next();
    }
    catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            data: "Error occured at isDriver",
        });
    }
};
const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.json({
                success: false,
                message: "Protected routes for admin only",
            });
        }
        next();
    }
    catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            message: "Error occured at isAdmin",
        });
    }
};
const isUser = (req, res, next) => {
    try {
        if (req.user.role !== "user") {
            return res.json({
                success: false,
                message: "Protected routes for user only",
            });
        }
        next();
    }
    catch (error) {
        logger.error(error);
        return res.json({
            success: false,
            data: "Error occured at isUser",
        });
    }
};
export { verifyToken, isUser, isDriver, isAdmin };
