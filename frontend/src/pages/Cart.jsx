import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const Cart = () => {
  const {
    cart,
    cartTotal,
    currency,
    deliveryFee,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartQuantity(productId, parseInt(newQuantity));
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    navigate("/place-order");
  };

  if (cart.length === 0) {
    return (
      <div className="my-10 text-center">
        <Title text1={"YOUR"} text2={"CART"} />
        <div className="max-w-md mx-auto mt-10 p-8 border border-gray-200">
          <img
            src={assets.cart_icon}
            alt="Empty Cart"
            className="w-20 h-20 mx-auto opacity-30"
          />
          <p className="mt-4 text-gray-500">Your cart is empty</p>
          <Link to="/collection">
            <button className="mt-6 px-6 py-2 bg-[#414141] text-white hover:bg-black transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <Title text1={"YOUR"} text2={"CART"} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Takes 2/3 of the space on large screens */}
        <div className="lg:col-span-2">
          <div className="border border-gray-200">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 border-t border-gray-200 items-center"
              >
                {/* Product info */}
                <div className="col-span-6 flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-[#414141] font-medium">{item.name}</h3>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-xs text-red-500 mt-2 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="sm:col-span-2 text-center">
                  <div className="sm:hidden inline-block font-medium mr-2">
                    Price:
                  </div>
                  {currency} {item.price}
                </div>

                {/* Quantity */}
                <div className="sm:col-span-2 flex justify-center">
                  <div className="sm:hidden inline-block font-medium mr-2">
                    Quantity:
                  </div>
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      className="w-10 text-center outline-none border-x border-gray-300"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="sm:col-span-2 text-center font-medium">
                  <div className="sm:hidden inline-block font-medium mr-2">
                    Total:
                  </div>
                  {currency} {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            {/* Cart actions */}
            <div className="p-4 border-t border-gray-200 flex justify-between">
              <button
                onClick={handleClearCart}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-sm"
              >
                Clear Cart
              </button>
              <Link to="/collection">
                <button className="px-4 py-2 border border-[#414141] text-[#414141] hover:bg-[#414141] hover:text-white transition-colors text-sm">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Order Summary - Takes 1/3 of the space on large screens */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 p-6">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  {currency} {cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>
                  {currency} {deliveryFee.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 font-medium flex justify-between">
                <span>Total:</span>
                <span>
                  {currency} {(cartTotal + deliveryFee).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-[#414141] text-white hover:bg-black transition-colors"
            >
              Proceed to Checkout
            </button>

            <div className="mt-6 text-xs text-gray-500">
              <p>Secure Checkout</p>
              <div className="flex gap-2 mt-2">
                <img
                  src={assets.razorpay_logo}
                  alt="Razorpay"
                  className="h-5"
                />
                <img src={assets.stripe_logo} alt="Stripe" className="h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
