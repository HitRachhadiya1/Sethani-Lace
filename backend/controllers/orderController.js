import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Create a new order
const createOrder = async (req, res) => {
  try {
    console.log("Received order request:", req.body);
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;
    const userId = req.user._id;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log("Invalid items:", items);
      return res.json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    // Validate each item has required fields
    for (const item of items) {
      if (!item.productId) {
        console.log("Item missing productId:", item);
        return res.json({
          success: false,
          message: "Each item must have a productId",
        });
      }
    }

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.firstName || !shippingAddress.lastName || 
        !shippingAddress.address || !shippingAddress.city || !shippingAddress.state || 
        !shippingAddress.postalCode || !shippingAddress.phoneNumber) {
      console.log("Invalid shipping address:", shippingAddress);
      return res.json({
        success: false,
        message: "Invalid shipping address",
      });
    }

    // Create new order
    const orderData = {
      user: userId,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: "Processing",
      date: Date.now(),
    };

    console.log("Creating order with data:", orderData);

    const order = new orderModel(orderData);
    await order.save();

    // Clear user's cart after successful order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await orderModel.find({ user: userId }).sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user", "name email")
      .sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get order by ID (admin only)
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await orderModel
      .findById(orderId)
      .populate("user", "name email");

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
};
