import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: Array, required: true },
    availableForSale: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    customFields: [{
        fieldName: { type: String, required: true },
        fieldValue: { type: String, required: true }
    }]
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
