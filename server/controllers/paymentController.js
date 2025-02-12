import stripe from "stripe";
import dotenv from "dotenv";

dotenv.config(); 

const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is missing in environment variables");
}

export const createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getPaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;

        const paymentIntent = await stripeInstance.paymentIntents.retrieve(paymentId);

        res.json({ status: paymentIntent.status });
    } catch (error) {
        res.status(500).json({ error: "Payment not found or invalid ID" });
    }
};
