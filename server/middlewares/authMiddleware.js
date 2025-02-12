import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/responseHandler.js";

export const protect = async (req, res, next) => {
    
    const token = req.cookies.token;

    if (!token) {
        return sendResponse(res, 401, false, "Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {_id: decoded.id, role: decoded.role};
        next();
    } catch (error) {
        return sendResponse(res, 400, false, "Invalid token.");
    }
};

// Middleware to check for admin role
export const admin = (req, res, next) => {
    if (req.user && req.user?.role === "admin") {
        next();
    } else {
        res.status(403);
        throw new Error("Not authorized as an admin");
    }
};
