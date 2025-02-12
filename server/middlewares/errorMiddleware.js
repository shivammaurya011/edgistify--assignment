// Custom error handling middleware
export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

// Handle 404 Not Found errors
export const notFound = (req, res, next) => {
    res.status(404);
    throw new Error(`Not Found - ${req.originalUrl}`);
};
