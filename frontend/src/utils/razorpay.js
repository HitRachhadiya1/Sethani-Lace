// Load Razorpay script dynamically
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initializeRazorpayPayment = async ({
  orderAmount,
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onFailure
}) => {
  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay Key ID
    amount: orderAmount * 100, // Amount in smallest currency unit (paise)
    currency: "INR",
    name: "Sethani Lace",
    description: "Order Payment",
    order_id: orderId,
    handler: function (response) {
      // Handle successful payment
      onSuccess(response);
    },
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerPhone,
    },
    notes: {
      order_id: orderId,
    },
    theme: {
      color: "#414141",
    },
  };

  try {
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  } catch (error) {
    onFailure(error);
  }
}; 