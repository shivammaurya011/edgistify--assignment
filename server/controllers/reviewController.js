import Product from "../models/productModel.js";

export const addReview = async (req, res) => {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed");
        }

        const review = { user: req.user._id, rating, comment, createdAt: new Date() };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.numReviews;

        await product.save();
        res.status(201).json({ message: "Review added" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
};

export const getReviews = async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (product) {
        res.json(product.reviews);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
};

export const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    const product = await Product.findOne({ "reviews._id": reviewId });

    if (!product) {
        res.status(404);
        throw new Error("Review not found");
    }

    product.reviews = product.reviews.filter(review => review._id.toString() !== reviewId);
    product.numReviews = product.reviews.length;
    product.rating = product.numReviews > 0
        ? product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.numReviews
        : 0;

    await product.save();
    res.json({ message: "Review deleted" });
};
