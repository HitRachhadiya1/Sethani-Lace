import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Sample order data - replace with API call
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setOrders([
        {
          id: "ORD-1001",
          customer: "John Doe",
          email: "john@example.com",
          date: "2023-11-15",
          total: 2499,
          status: "Delivered",
          paymentMethod: "Credit Card",
          items: [
            { id: "1", name: "Lace Trim Dupatta", quantity: 1, price: 1499 },
            { id: "2", name: "Embroidered Scarf", quantity: 1, price: 1000 },
          ],
        },
        {
          id: "ORD-1002",
          customer: "Sarah Smith",
          email: "sarah@example.com",
          date: "2023-11-14",
          total: 3499,
          status: "Processing",
          paymentMethod: "UPI",
          items: [
            { id: "3", name: "Designer Saree", quantity: 1, price: 3499 },
          ],
        },
        {
          id: "ORD-1003",
          customer: "Raj Kumar",
          email: "raj@example.com",
          date: "2023-11-12",
          total: 5999,
          status: "Shipped",
          paymentMethod: "Net Banking",
          items: [
            {
              id: "4",
              name: "Bridal Collection Set",
              quantity: 1,
              price: 5999,
            },
          ],
        },
        {
          id: "ORD-1004",
          customer: "Priya Sharma",
          email: "priya@example.com",
          date: "2023-11-10",
          total: 2999,
          status: "Cancelled",
          paymentMethod: "Cash on Delivery",
          items: [
            { id: "5", name: "Party Wear Dupatta", quantity: 1, price: 1499 },
            { id: "6", name: "Fancy Stole", quantity: 1, price: 1500 },
          ],
        },
        {
          id: "ORD-1005",
          customer: "Amit Patel",
          email: "amit@example.com",
          date: "2023-11-08",
          total: 4499,
          status: "Delivered",
          paymentMethod: "Credit Card",
          items: [
            {
              id: "7",
              name: "Wedding Collection Set",
              quantity: 1,
              price: 4499,
            },
          ],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Order status options
  const statusOptions = [
    "all",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

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

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "total") {
      return b.total - a.total;
    } else if (sortBy === "id") {
      return a.id.localeCompare(b.id);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-[#414141] text-white px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="Logo" className="h-8" />
          <span className="font-medium">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Welcome, Admin</span>
          <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-[calc(100vh-56px)] border-r border-gray-200 fixed">
          <nav className="py-4">
            <ul>
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/inventory"
                  className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path
                      fillRule="evenodd"
                      d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Inventory
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 border-l-4 border-[#414141] text-[#414141] font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/customers"
                  className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/settings"
                  className="flex items-center gap-2 px-6 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-medium text-[#414141]">Orders</h1>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#414141] text-white rounded hover:bg-black transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Export Orders
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded shadow border border-gray-100 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="search"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Search Orders
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141]"
                    placeholder="Search by order ID or customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Filter by Status
                </label>
                <select
                  id="status"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141]"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>
                      {status === "all" ? "All Status" : status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sort By
                </label>
                <select
                  id="sort"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#414141] focus:border-[#414141]"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Date (Newest First)</option>
                  <option value="total">Total Amount</option>
                  <option value="id">Order ID</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded shadow border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-[#414141] border-r-transparent"></div>
                <p className="mt-2 text-gray-600">Loading orders...</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        ₹ {order.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => {
                              // View order details functionality
                              console.log("View order", order.id);
                            }}
                          >
                            View
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => {
                              // Update status functionality
                              console.log("Update status", order.id);
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {!loading && sortedOrders.length === 0 && (
              <div className="text-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="mt-2 text-gray-500">
                  No orders found matching your filters.
                </p>
              </div>
            )}
          </div>

          {/* Order Details Modal - Can be implemented when needed */}
        </div>
      </div>
    </div>
  );
};

export default Orders;
