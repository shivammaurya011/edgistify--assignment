import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Middleware Imports
import corsMiddleware from "./middlewares/corsMiddleware.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { apiLimiter } from "./middlewares/rateLimitMiddleware.js";

// Load environment variables
dotenv.config();
const port = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

const app = express();

// CORS Middleware
app.use(corsMiddleware);

// Security Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate Limiting
app.use(apiLimiter);

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Edgistify E-commerce API is running...");
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
