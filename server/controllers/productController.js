import Product from "../models/productModel.js";
import { sendResponse } from "../utils/responseHandler.js";

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('category');
        sendResponse(res, 200, true, "Products fetched successfully", products);
    } catch (error) {
        sendResponse(res, 500, false, "Server error", error.message);
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return sendResponse(res, 404, false, "Product not found.");
        }
        sendResponse(res, 200, true, "Product fetched successfully", product);
    } catch (error) {
        sendResponse(res, 500, false, "Server error", error.message);
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        if (!name || !description || !price || !category || stock === undefined) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Handle file uploads (Fix: use `req.file` instead of `req.files`)
        const images = req.file ? [{ url: `/uploads/${req.file.filename}`, public_id: req.file.filename }] : [];

        const product = await Product.create({ name, description, price, category, stock, images });
        res.status(201).json({ success: true, message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        const { name, description, price, stock } = req.body;
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock !== undefined ? stock : product.stock;

        // Fix: Use `req.file` instead of `req.files`
        if (req.file) {
            product.images = [{ url: `/uploads/${req.file.filename}`, public_id: req.file.filename }];
        }

        await product.save();
        res.status(200).json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return sendResponse(res, 404, false, "Product not found.");
        }

        await product.deleteOne();
        sendResponse(res, 200, true, "Product removed successfully.");
    } catch (error) {
        sendResponse(res, 500, false, "Server error", error.message);
    }
};
