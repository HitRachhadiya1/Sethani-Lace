import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"
import mongoose from "mongoose"

const addProduct = async (req, res) => {
    try {
        const {name, description, price, category, stock, availableForSale, customFields} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )
        
        const productData  = {
            name, 
            description,
            category,
            price: Number(price),
            stock: Number(stock),
            availableForSale: availableForSale === "true" ? true : false,
            image: imagesUrl,
            date: Date.now(),
            customFields: customFields ? JSON.parse(customFields) : []
        }
        console.log(productData);

        const product = new productModel(productData)
        await product.save()

        res.json({success:true,message: "product Added"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const listProduct = async (req, res) => {
    try {
        const isAdmin = req.query.isAdmin === 'true';
        let query = isAdmin ? {} : { availableForSale: true };
        
        const products = await productModel.find(query);
        res.json({success:true, products})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message:"Product removed"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
    }
}

const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const isAdmin = req.query.isAdmin === 'true';
        
        const product = await productModel.findById(productId);
        
        if (!product) {
            return res.json({success: false, message: "Product not found"});
        }

        // If user is admin, allow access to all products
        // If regular user, only allow access to available products
        if (!isAdmin && !product.availableForSale) {
            return res.json({success: false, message: "Product not available"});
        }

        res.json({success: true, product});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;

        // Validate that id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID format" });
        }

        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Only update the fields that are provided
        const updates = {};
        if (updateData.name) updates.name = updateData.name;
        if (updateData.description) updates.description = updateData.description;
        if (updateData.category) updates.category = updateData.category;
        if (updateData.price !== undefined) updates.price = Number(updateData.price);
        if (updateData.stock !== undefined) updates.stock = Number(updateData.stock);
        if (updateData.availableForSale !== undefined) updates.availableForSale = updateData.availableForSale;
        if (updateData.customFields) updates.customFields = Array.isArray(updateData.customFields) ? updateData.customFields : [];

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: false }  // Disable validation since we're doing partial update
        );

        res.json({ success: true, message: "Product updated", product: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addProduct, listProduct, removeProduct, singleProduct, updateProduct };
