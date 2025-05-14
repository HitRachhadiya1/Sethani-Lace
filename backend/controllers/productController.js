import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"

const addProduct = async (req, res) => {
    try {
        const {name, description, price, category, stock, availableForSale} = req.body

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
            date: Date.now()
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
        const { id, name, description, price, category, stock, availableForSale } = req.body;

        const product = await productModel.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            {
                name,
                description,
                category,
                price: Number(price),
                stock: Number(stock),
                availableForSale,
            },
            { new: true }
        );

        res.json({ success: true, message: "Product updated", product: updatedProduct });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addProduct, listProduct, removeProduct, singleProduct, updateProduct };
