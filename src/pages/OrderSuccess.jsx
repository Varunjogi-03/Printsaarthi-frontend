import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/NavBar';

function OrderSuccess() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, orderData } = location.state || {};

  // Redirect if not authenticated or no order data
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }

    if (!orderId || !orderData) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, navigate, orderId, orderData]);

  const handleNewOrder = () => {
    navigate('/upload');
  };

  const handleViewOrders = () => {
    navigate('/account');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (!isAuthenticated || !orderId || !orderData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-4xl">✅</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-300 text-lg">Thank you for choosing Printsaarthi</p>
          </div>

          {/* Order Details Card */}
          <div className="bg-base-200 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">📋 Order Details</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Order ID:</span>
                <span className="text-yellow-400 font-bold">{orderId}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Order Date:</span>
                <span className="text-white">{new Date(orderData.orderDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Amount:</span>
                <span className="text-yellow-400 font-bold text-xl">${orderData.price.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Payment Method:</span>
                <span className="text-white capitalize">{orderData.paymentMethod}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Payment Status:</span>
                <span className="text-green-400 font-semibold">✅ Completed</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Order Status:</span>
                <span className="text-blue-400 font-semibold">⏳ Processing</span>
              </div>
            </div>

            <div className="border-t border-gray-600 mt-6 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Print Specifications:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Paper Size:</span>
                  <p className="text-white">{orderData.specifications.paperSize}</p>
                </div>
                <div>
                  <span className="text-gray-400">Paper Type:</span>
                  <p className="text-white capitalize">{orderData.specifications.paperType}</p>
                </div>
                <div>
                  <span className="text-gray-400">Color:</span>
                  <p className="text-white capitalize">{orderData.specifications.color.replace('-', ' ')}</p>
                </div>
                <div>
                  <span className="text-gray-400">Quantity:</span>
                  <p className="text-white">{orderData.specifications.quantity}</p>
                </div>
                <div>
                  <span className="text-gray-400">Binding:</span>
                  <p className="text-white capitalize">{orderData.specifications.binding}</p>
                </div>
                <div>
                  <span className="text-gray-400">Files:</span>
                  <p className="text-white">{orderData.files.length} file(s)</p>
                </div>
              </div>
              
              {orderData.specifications.specialInstructions && (
                <div className="mt-4">
                  <span className="text-gray-400">Special Instructions:</span>
                  <p className="text-white mt-1">{orderData.specifications.specialInstructions}</p>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-900/20 rounded-2xl p-8 mb-8 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-6">📧 What's Next?</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📧</span>
                <div>
                  <h3 className="text-white font-semibold">Email Confirmation</h3>
                  <p className="text-gray-300 text-sm">We've sent a confirmation email to {orderData.userEmail}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⚙️</span>
                <div>
                  <h3 className="text-white font-semibold">Order Processing</h3>
                  <p className="text-gray-300 text-sm">Our team will start processing your order within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h3 className="text-white font-semibold">Status Updates</h3>
                  <p className="text-gray-300 text-sm">You'll receive updates via email and SMS as your order progresses</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🚚</span>
                <div>
                  <h3 className="text-white font-semibold">Delivery</h3>
                  <p className="text-gray-300 text-sm">Expected delivery: 2-3 business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleNewOrder}
              className="btn btn-lg bg-yellow-400 text-black hover:bg-yellow-300 border-0 font-bold rounded-xl"
            >
              🆕 New Order
            </button>
            
            <button
              onClick={handleViewOrders}
              className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-black font-bold rounded-xl"
            >
              📋 View Orders
            </button>
            
            <button
              onClick={handleGoHome}
              className="btn btn-outline border-2 border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-black font-bold rounded-xl"
            >
              🏠 Go Home
            </button>
          </div>

          {/* Support Information */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-2">Need help with your order?</p>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="text-gray-300">
                📧 support@printsaarthi.com
              </div>
              <div className="text-gray-300">
                📱 +91 98765 43210
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
