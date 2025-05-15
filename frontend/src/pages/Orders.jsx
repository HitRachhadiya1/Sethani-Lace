import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../utils/api";
import Title from "../components/Title";

const Orders = () => {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.success) {
      setShowSuccess(true);
      // Clear the success state after showing the message
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }

    // Fetch user orders
    fetchOrders();
  }, [location.state]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.getUserOrders();
      if (response.success) {
        setOrders(response.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10">
      <Title text1={"MY ORDERS"} text2={""} />

      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>Your order has been placed successfully!</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center my-10">
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Order header */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-4 p-4 bg-gray-50 font-medium text-gray-700">
            <div className="sm:col-span-3">Order ID</div>
            <div className="sm:col-span-3">Date</div>
            <div className="sm:col-span-2 text-center">Items</div>
            <div className="sm:col-span-2 text-center">Total</div>
            <div className="sm:col-span-2 text-center">Status</div>
          </div>

          {/* Order Items */}
          {orders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 border-t border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="sm:col-span-3 flex flex-col">
                <div className="font-medium">{order._id.substring(0, 8)}</div>
                <button className="text-xs text-blue-500 hover:text-blue-700 mt-1 sm:hidden">
                  View Details
                </button>
              </div>

              <div className="sm:col-span-3">
                <div className="sm:hidden inline-block font-medium mr-2">
                  Date:
                </div>
                {new Date(order.date).toLocaleDateString()}
              </div>

              <div className="sm:col-span-2 sm:text-center">
                <div className="sm:hidden inline-block font-medium mr-2">
                  Items:
                </div>
                {order.items.length}
              </div>

              <div className="sm:col-span-2 sm:text-center">
                <div className="sm:hidden inline-block font-medium mr-2">
                  Total:
                </div>
                ₹ {order.totalAmount.toFixed(2)}
              </div>

              <div className="sm:col-span-2 sm:text-center">
                <div className="sm:hidden inline-block font-medium mr-2">
                  Status:
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="hidden sm:flex sm:col-span-12 justify-end">
                <button className="text-xs text-blue-500 hover:text-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
