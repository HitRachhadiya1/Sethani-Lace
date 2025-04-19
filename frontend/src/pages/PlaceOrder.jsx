import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const PlaceOrder = () => {
  const { cart, cartTotal, currency, deliveryFee, clearCart } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    paymentMethod: "card",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Check if cart is empty and redirect if it is
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    // Basic validation for required fields
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.phoneNumber.trim())
      errors.phoneNumber = "Phone number is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.postalCode.trim())
      errors.postalCode = "Postal code is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector(".error-message");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Clear cart and redirect to success page
      clearCart();
      navigate("/orders", { state: { success: true } });
    }, 2000);
  };

  if (cart.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="my-10">
      <Title text1={"CHECKOUT"} text2={""} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Shipping and Payment Form - Takes 2/3 of the space on large screens */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information Section */}
            <div className="border border-gray-200 p-6">
              <h2 className="text-xl font-medium mb-4">Contact Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      formErrors.firstName
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-[#414141]`}
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-xs mt-1 error-message">
                      {formErrors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      formErrors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-[#414141]`}
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-xs mt-1 error-message">
                      {formErrors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-[#414141]`}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1 error-message">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      formErrors.phoneNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-[#414141]`}
                  />
                  {formErrors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1 error-message">
                      {formErrors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address Section */}
            <div className="border border-gray-200 p-6">
              <h2 className="text-xl font-medium mb-4">Shipping Address</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      formErrors.address ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-[#414141]`}
                  />
                  {formErrors.address && (
                    <p className="text-red-500 text-xs mt-1 error-message">
                      {formErrors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full p-2 border ${
                        formErrors.city ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-[#414141]`}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-xs mt-1 error-message">
                        {formErrors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full p-2 border ${
                        formErrors.state ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-[#414141]`}
                    />
                    {formErrors.state && (
                      <p className="text-red-500 text-xs mt-1 error-message">
                        {formErrors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`w-full p-2 border ${
                        formErrors.postalCode
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-[#414141]`}
                    />
                    {formErrors.postalCode && (
                      <p className="text-red-500 text-xs mt-1 error-message">
                        {formErrors.postalCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="border border-gray-200 p-6">
              <h2 className="text-xl font-medium mb-4">Payment Method</h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="card" className="flex items-center">
                    <span className="mr-2">Credit/Debit Card</span>
                    <div className="flex space-x-1">
                      <img
                        src={assets.stripe_logo}
                        alt="Card"
                        className="h-6"
                      />
                    </div>
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="razorpay"
                    name="paymentMethod"
                    value="razorpay"
                    checked={formData.paymentMethod === "razorpay"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="razorpay" className="flex items-center">
                    <span className="mr-2">Razorpay</span>
                    <img
                      src={assets.razorpay_logo}
                      alt="Razorpay"
                      className="h-6"
                    />
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="cod">Cash on Delivery</label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 lg:hidden">
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 text-white ${
                  isProcessing ? "bg-gray-400" : "bg-[#414141] hover:bg-black"
                } transition-colors`}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary - Takes 1/3 of the space on large screens */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 p-6 sticky top-4">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mb-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-3 border-b border-gray-100"
                >
                  <div className="w-16 h-16">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-medium">
                      {currency} {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

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

            <div className="hidden lg:block">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`w-full py-3 text-white ${
                  isProcessing ? "bg-gray-400" : "bg-[#414141] hover:bg-black"
                } transition-colors`}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </div>

            <div className="mt-6 text-xs text-gray-500">
              <p>
                By placing an order, you agree to our Terms of Service and
                Privacy Policy.
              </p>
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

export default PlaceOrder;
