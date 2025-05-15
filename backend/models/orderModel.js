import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [orderItemSchema],
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    phoneNumber: { type: String, required: true }
  },
  paymentMethod: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    required: true, 
    default: 'Processing',
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] 
  },
  date: { type: Date, default: Date.now }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;