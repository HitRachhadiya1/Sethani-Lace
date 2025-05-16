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
    <div className="my-10 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-2">
            <Link 
              to={`/collection?category=${product.category}`}
              className="text-sm text-gray-500 hover:text-[#414141] transition-colors"
            >
              {product.category}
            </Link>
          </div>
          <h1 className="text-2xl font-medium text-[#414141] mb-4">
            {product.name}
          </h1>

          <div className="mb-4">
            <span className="text-2xl font-semibold text-[#414141]">
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

          {/* Custom Fields Section */}
          {product.customFields && product.customFields.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-[#414141] mb-2">
                Additional Details
              </h2>
              <div className="space-y-2">
                {product.customFields.map((field, index) => (
                  <div key={index} className="flex">
                    <span className="text-sm font-medium text-gray-700 w-1/3">{field.fieldName}:</span>
                    <span className="text-sm text-gray-600">{field.fieldValue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.size && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-[#414141] mb-2">Size</h2>
              <p className="text-gray-600">{product.size}</p>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="w-32">
              <label htmlFor="quantity" className="sr-only">
                Quantity
              </label>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#414141] disabled:text-gray-400"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max={product.stock}
                  className="w-12 h-10 text-center border-x border-gray-300 focus:outline-none"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button
                  type="button"
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#414141] disabled:text-gray-400"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock < 1}
              className={`flex-1 py-3 px-6 text-sm font-medium rounded ${
                product.stock < 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#414141] text-white hover:bg-black transition-colors"
              }`}
            >
              {product.stock < 1 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <Title text1={"SIMILAR"} text2={"PRODUCTS"} />
            <Link
              to={`/collection?category=${product.category}`}
              className="text-sm text-[#414141] hover:text-black transition-colors"
            >
              View All {product.category} Products →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="border border-gray-200 hover:shadow-md transition-shadow"
              >
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
