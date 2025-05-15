import React, { useState } from 'react';
import { loadRazorpayScript, initializeRazorpayPayment } from '../utils/razorpay';
import { api } from '../utils/api';

const PaymentButton = ({ 
  orderAmount, 
  orderId, 
  customerName, 
  customerEmail, 
  customerPhone,
  onPaymentSuccess,
  onPaymentError,
  className
}) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      // Create Razorpay order
      const orderResponse = await api.createRazorpayOrder({
        amount: orderAmount,
        orderId: orderId,
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Failed to create order');
      }

      // Initialize payment
      await initializeRazorpayPayment({
        orderAmount,
        orderId: orderResponse.orderId,
        customerName,
        customerEmail,
        customerPhone,
        onSuccess: async (response) => {
          try {
            // Verify payment
            const verificationResponse = await api.verifyPayment({
              orderId: orderResponse.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (verificationResponse.success) {
              // Update order payment status
              await api.updatePaymentStatus(orderId, {
                paymentId: response.razorpay_payment_id,
                status: 'completed',
              });

              onPaymentSuccess(response);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            onPaymentError(error);
          }
        },
        onFailure: (error) => {
          onPaymentError(error);
        },
      });
    } catch (error) {
      onPaymentError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Pay Now</span>
        </>
      )}
    </button>
  );
};

export default PaymentButton; 