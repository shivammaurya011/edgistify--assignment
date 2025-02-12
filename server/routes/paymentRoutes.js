import express from "express";
import { createPaymentIntent, getPaymentStatus } from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPaymentIntent);
router.get("/:paymentId", protect, getPaymentStatus);

export default router;
