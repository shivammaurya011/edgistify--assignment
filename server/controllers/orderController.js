import Order from "../models/orderModel.js";

// Create a new order
export const createOrder = async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
    
    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: "No order items" });
    }

    try {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            isPaid: false,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};

// Get orders for a specific user
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "id name email");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching all orders", error });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error });
    }
};

// Admin: Update order status (mark as delivered)
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            await order.save();
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error });
    }
};
