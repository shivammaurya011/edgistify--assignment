import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ["Credit Card", "Debit Card", "UPI", "Net Banking", "Cash on Delivery"],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Paid", "Pending", "Failed"],
            default: "Pending",
        },
        transactionId: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
