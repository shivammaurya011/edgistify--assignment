import express from "express";
import { createOrder, getOrderById, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/user/:userId", protect, getUserOrders); 
router.get("/", protect, admin, getAllOrders); 
router.get("/:id", protect, getOrderById); 
router.put("/:id", protect, admin, updateOrderStatus); 

export default router;
