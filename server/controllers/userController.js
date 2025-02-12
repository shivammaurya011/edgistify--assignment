import User from "../models/userModel.js";
import { sendResponse } from "../utils/responseHandler.js";

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return sendResponse(res, 404, false, "User not found");
        }
        return sendResponse(res, 200, true, "User profile fetched", user);
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return sendResponse(res, 404, false, "User not found");
        }

        user.name = req.body.name || user.name;
        if (req.body.password) {
            user.password = req.body.password;
        }

        await user.save();

        return sendResponse(res, 200, true, "User profile updated", {
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return sendResponse(res, 404, false, "User not found");
        }

        await user.deleteOne();
        return sendResponse(res, 200, true, "User deleted successfully");
    } catch (error) {
        return sendResponse(res, 500, false, error.message);
    }
};
