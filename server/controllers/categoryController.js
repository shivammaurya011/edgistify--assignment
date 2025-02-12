import Category from "../models/categoryModel.js";
import { sendResponse } from "../utils/responseHandler.js";

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        sendResponse(res, 200, true, "Categories fetched successfully", categories);
    } catch (error) {
        sendResponse(res, 500, false, "Server error", error.message);
    }
};

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return sendResponse(res, 400, false, "Category name is required.");
        }

        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return sendResponse(res, 400, false, "Category already exists.");
        }

        const category = await Category.create({ name });
        sendResponse(res, 201, true, "Category created successfully", category);
    } catch (error) {
        sendResponse(res, 500, false, "Server error", error.message);
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findById(req.params.id);

        if (!category) {
            return sendResponse(res, 404, false, "Category not found.");
        }

        category.name = name || category.name;
        await category.save();
        sendResponse(res, 200, true, "Category updated successfully", category);
    } catch (error) {
        sendResponse(res, 500, false, "Server error", error.message);
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return sendResponse(res, 404, false, "Category not found.");
        }

        await category.deleteOne();
        sendResponse(res, 200, true, "Category removed successfully.");
    } catch (error) {
        sendResponse(res, 500, false, "Server error", error.message);
    }
};
