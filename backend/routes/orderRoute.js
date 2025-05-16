import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
} from "../controllers/orderController.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const orderRouter = express.Router();

// User routes
orderRouter.post("/create", authMiddleware, createOrder);
orderRouter.get("/user", authMiddleware, getUserOrders);

// Admin routes
orderRouter.get("/all", authMiddleware, adminMiddleware, getAllOrders);
orderRouter.post("/update-status", authMiddleware, adminMiddleware, updateOrderStatus);
orderRouter.get("/order/:id", authMiddleware, adminMiddleware, getOrderById);

export default orderRouter;
