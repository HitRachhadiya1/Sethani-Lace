import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await api.getOrderById(id);
      
      if (response.success) {
        setOrder(response.order);
        setUpdateStatus(response.order.status);
      } else {
        setError("Failed to load order details");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await api.updateOrderStatus(order._id, updateStatus);
      
      if (response.success) {
        setOrder({ ...order, status: updateStatus });
        alert("Order status updated successfully");
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-yellow-100 text-yellow-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-[#414141] border-r-transparent"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-6">
        <div className="bg-red-50 p-4 rounded-md border border-red-200 mb-4">
          <p className="text-red-700">{error || "Order not found"}</p>
        </div>
        <button 
          onClick={() => navigate("/admin/orders")}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Order Details</h1>
          <p className="text-gray-600">Order #{order._id}</p>
        </div>
        <button
          onClick={() => navigate("/admin/orders")}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back to Orders
        </button>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-medium text-gray-700 mb-2">Order Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-medium">{order._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date:</span>
              <span>{new Date(order.date).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span>{order.paymentMethod}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-medium text-gray-700 mb-2">Customer Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Name:</span>
              <span>{order.user?.name || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span>{order.user?.email || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone:</span>
              <span>{order.shippingAddress?.phoneNumber || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-medium text-gray-700 mb-2">Shipping Address</h2>
          <div className="space-y-1">
            <p>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
            <p>{order.shippingAddress?.address}</p>
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
            <p>Phone: {order.shippingAddress?.phoneNumber}</p>
          </div>
        </div>
      </div>

      {/* Update Status */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-medium text-gray-700 mb-3">Update Order Status</h2>
        <div className="flex items-end gap-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={updateStatus}
              onChange={(e) => setUpdateStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <button
            onClick={handleUpdateStatus}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Status
          </button>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded shadow mb-6">
        <div className="border-b border-gray-100 px-6 py-3">
          <h2 className="font-medium text-[#414141]">Order Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 object-cover rounded mr-3"
                        />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">ID: {item.productId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹ {item.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹ {(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="3" className="px-6 py-4 text-right font-medium">
                  Subtotal:
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ₹ {order.totalAmount.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;