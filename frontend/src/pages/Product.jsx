import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    // Find the product by ID
    const productData = products[id];

    if (!productData) {
      navigate("/collection");
      return;
    }

    setProduct({
      id,
      ...productData,
    });

    // Find similar products (same category)
    const similar = Object.entries(products)
      .filter(([productId, item]) => {
        return (
          productId !== id &&
          item.category === productData.category &&
          item.forSale
        );
      })
      .map(([productId, item]) => ({
        id: productId,
        ...item,
      }))
      .slice(0, 4); // Get only 4 similar products

    setSimilarProducts(similar);
  }, [id, products, navigate]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(Math.min(value, product.stock));
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(id, quantity);
    // Optionally navigate to cart or show a confirmation message
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="border border-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-medium text-[#414141] mb-2">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 mb-4">{product.category}</p>

          <div className="mb-4">
            <span className="text-xl font-semibold text-[#414141]">
              {currency} {product.price}
            </span>
            {product.stock < 10 && (
              <span className="ml-4 text-sm text-red-500">
                Only {product.stock} left in stock
              </span>
            )}
          </div>

          {product.description && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-[#414141] mb-2">
                Description
              </h2>
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}

          {product.size && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-[#414141] mb-2">Size</h2>
              <p className="text-gray-600">{product.size}</p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-[#414141] mb-2">
              Quantity
            </h2>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="px-3 py-1 border border-gray-300 hover:bg-gray-100"
                disabled={product.stock < 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.stock}
                className="w-16 text-center py-1 border-t border-b border-gray-300 outline-none"
                disabled={product.stock < 1}
              />
              <button
                onClick={increaseQuantity}
                className="px-3 py-1 border border-gray-300 hover:bg-gray-100"
                disabled={product.stock < 1 || quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock < 1}
              className={`px-8 py-3 text-white ${
                product.stock < 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#414141] hover:bg-black transition-colors"
              }`}
            >
              {product.stock < 1 ? "Out of Stock" : "Add to Cart"}
            </button>

            <Link to="/collection">
              <button className="px-8 py-3 border border-[#414141] text-[#414141] hover:bg-[#414141] hover:text-white transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <Title text1={"SIMILAR"} text2={"PRODUCTS"} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {similarProducts.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 hover:shadow-md transition-shadow"
              >
                <Link to={`/product/${item.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-[#414141]">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="font-semibold text-[#414141] mt-2">
                      {currency} {item.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
