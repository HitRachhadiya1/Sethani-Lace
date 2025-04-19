import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Title from "../components/Title";

const Orders = () => {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = React.useState(false);

  useEffect(() => {
    if (location.state?.success) {
      setShowSuccess(true);
      // Clear the success state after showing the message
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  }, [location.state]);

  // Mock orders data (in a real app, this would come from an API)
  const orders = [
    {
      id: "ORD10001",
      date: "2023-07-15",
      total: 1299.97,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD10002",
      date: "2023-08-20",
      total: 499.5,
      status: "Processing",
      items: 2,
    },
    {
      id: "ORD10003",
      date: "2023-09-05",
      total: 799.99,
      status: "Shipped",
      items: 1,
    },
  ];

  return (
    <div className="my-10">
      <Title text1={"YOUR"} text2={"ORDERS"} />

      {showSuccess && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p>
              Your order has been successfully placed! Thank you for shopping
              with us.
            </p>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center p-8 border border-gray-200">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="border border-gray-200">
          {/* Order Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50 font-medium">
            <div className="col-span-3">Order ID</div>
            <div className="col-span-3">Date</div>
            <div className="col-span-2 text-center">Items</div>
            <div className="col-span-2 text-center">Total</div>
            <div className="col-span-2 text-center">Status</div>
          </div>

          {/* Order Items */}
          {orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 border-t border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="sm:col-span-3 flex flex-col">
                <div className="font-medium">{order.id}</div>
                <button className="text-xs text-blue-500 hover:text-blue-700 mt-1 sm:hidden">
                  View Details
                </button>
              </div>

              <div className="sm:col-span-3">
                <div className="sm:hidden inline-block font-medium mr-2">
                  Date:
                </div>
                {order.date}
              </div>

              <div className="sm:col-span-2 sm:text-center">
                <div className="sm:hidden inline-block font-medium mr-2">
                  Items:
                </div>
                {order.items}
              </div>

              <div className="sm:col-span-2 sm:text-center">
                <div className="sm:hidden inline-block font-medium mr-2">
                  Total:
                </div>
                ₹ {order.total.toFixed(2)}
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
