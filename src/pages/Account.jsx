import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import DatabaseTest from '../components/DatabaseTest';

function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]);

  // Fetch order history from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user?.id) {
          const response = await ordersAPI.getUserOrders(user.id);
          if (response.data.success) {
            setOrderHistory(response.data.orders);
          }
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Fallback to localStorage if backend fails
        const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        setOrderHistory(orders);
      }
    };

    fetchOrders();
  }, [user?.id]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNewOrder = () => {
    navigate('/upload');
  };

  const handleViewOrders = () => {
    // Scroll to order history section
    document.getElementById('order-history')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please log in to view your account</h2>
          <button 
            onClick={() => navigate('/login')}
            className="btn btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Account</h1>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-black">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{user.name}</h3>
                    <p className="text-gray-300">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-yellow-400 mb-2">Name</label>
                    <p className="text-white bg-white/5 rounded-lg p-3">{user.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-yellow-400 mb-2">Email</label>
                    <p className="text-white bg-white/5 rounded-lg p-3">{user.email}</p>
                  </div>
                  
                  {user.phone && (
                    <div>
                      <label className="block text-sm font-medium text-yellow-400 mb-2">Phone</label>
                      <p className="text-white bg-white/5 rounded-lg p-3">{user.phone}</p>
                    </div>
                  )}
                  
                  {user.address && (
                    <div>
                      <label className="block text-sm font-medium text-yellow-400 mb-2">Address</label>
                      <p className="text-white bg-white/5 rounded-lg p-3">{user.address}</p>
                    </div>
                  )}

                  {/* Shopkeeper specific fields */}
                  {user.shopName && (
                    <div>
                      <label className="block text-sm font-medium text-yellow-400 mb-2">Shop Name</label>
                      <p className="text-white bg-white/5 rounded-lg p-3">{user.shopName}</p>
                    </div>
                  )}
                  
                  {user.shopAddress && (
                    <div>
                      <label className="block text-sm font-medium text-yellow-400 mb-2">Shop Address</label>
                      <p className="text-white bg-white/5 rounded-lg p-3">{user.shopAddress}</p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4 pt-6">
                  <button className="btn btn-primary bg-yellow-400 text-black hover:bg-yellow-300 border-0">
                    Edit Profile
                  </button>
                  <button className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-900">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleViewOrders}
                  className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 border-0"
                >
                  📋 View Orders
                </button>
                <button 
                  onClick={handleNewOrder}
                  className="btn btn-primary w-full bg-green-600 hover:bg-green-700 border-0"
                >
                  🛒 New Order
                </button>
                <button className="btn btn-primary w-full bg-purple-600 hover:bg-purple-700 border-0">
                  💬 Support
                </button>
              </div>
            </div>

            {/* Database Test */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
              <DatabaseTest />
            </div>

            {/* Account Status */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Status:</span>
                  <span className="badge badge-success">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Member since:</span>
                  <span className="text-white">
                    {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                {user.isApproved !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Approved:</span>
                    <span className={`badge ${user.isApproved ? 'badge-success' : 'badge-warning'}`}>
                      {user.isApproved ? 'Yes' : 'Pending'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Logout */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
              <button 
                onClick={handleLogout}
                className="btn btn-error w-full bg-red-600 hover:bg-red-700 border-0"
              >
                 Logout
              </button>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div id="order-history" className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
          
          {orderHistory.length > 0 ? (
            <div className="space-y-4">
              {orderHistory.map((order, index) => (
                <div key={order._id || index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Order #{order._id || order.orderId}</h3>
                      <p className="text-gray-300 text-sm">{new Date(order.createdAt || order.orderDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-bold text-lg">₹{order.amount?.toFixed(2) || order.price?.toFixed(2)}</p>
                      <span className={`badge ${
                        order.status === 'completed' ? 'badge-success' :
                        order.status === 'processing' ? 'badge-warning' :
                        order.status === 'pending' ? 'badge-info' :
                        'badge-error'
                      }`}>
                        {order.status || order.orderStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Files:</span>
                      <p className="text-white">{order.files?.length || 0} file(s)</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Paper:</span>
                      <p className="text-white">
                        {order.specifications?.paperSize || 'N/A'} {order.specifications?.paperType || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Quantity:</span>
                      <p className="text-white">{order.specifications?.quantity || 'N/A'}</p>
                    </div>
                  </div>
                  
                  {order.specifications?.specialInstructions && (
                    <div className="mt-4">
                      <span className="text-gray-400 text-sm">Special Instructions:</span>
                      <p className="text-white text-sm mt-1">{order.specifications.specialInstructions}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-300 mb-4">No orders yet</p>
              <button 
                onClick={handleNewOrder}
                className="btn btn-primary bg-yellow-400 text-black hover:bg-yellow-300 border-0"
              >
                Start Your First Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
