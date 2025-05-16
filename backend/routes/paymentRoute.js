import express from "express";
import { createRazorpayOrder, verifyPayment } from "../controllers/paymentController.js";
import { authMiddleware } from "../middleware/auth.js";

const paymentRouter = express.Router();

// Create Razorpay order
paymentRouter.post("/create-order", authMiddleware, createRazorpayOrder);

// Verify payment
paymentRouter.post("/verify", authMiddleware, verifyPayment);

export default paymentRouter; 