import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'order', required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, required: true, default: 'INR' },
  status: { 
    type: String, 
    required: true, 
    default: 'pending',
    enum: ['pending', 'completed', 'failed', 'refunded'] 
  },
  paymentMethod: { type: String, required: true },
  refundStatus: { 
    type: String,
    enum: ['none', 'requested', 'processing', 'completed'],
    default: 'none'
  },
  refundId: { type: String },
  refundAmount: { type: Number },
  refundDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
paymentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const paymentModel = mongoose.models.payment || mongoose.model("payment", paymentSchema);

export default paymentModel; 