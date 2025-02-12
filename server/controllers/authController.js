import User from "../models/userModel.js";
import { sendResponse } from "../utils/responseHandler.js";

export const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const userExists = await User.findOne({ 
            $or: [{ email }, { phone }] 
        });

        if (userExists) {
            return sendResponse(res, 400, false, "User with this email or phone already exists");
        }

        const user = new User({ name, email, phone, password });
        await user.save();

        return sendResponse(res, 201, true, "User created successfully", user);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return sendResponse(res, 404, false, "User not found");
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return sendResponse(res, 401, false, "Invalid credentials");
        }

        const token = user.generateAuthToken();

        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });

        return sendResponse(res, 200, true, "User logged in successfully", { user, token });
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return sendResponse(res, 200, true, "User logged out successfully");
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

export const verify = async (req, res) => {
    try {
    const token = req.cookies.token;

    if (!token) {
        return sendResponse(res, 401, false, 'Unauthorized');
    }

    const decoded = User.verifyAuthToken(token);
    if (!decoded) {
        return sendResponse(res, 401, false, 'Invalid or expired token');
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
        return sendResponse(res, 404, false, 'User not found');
    }

    return sendResponse(res, 200, true, 'User verified', user);
    } catch (error) {
    return sendResponse(res, 500, false, error.message);
    }
};
