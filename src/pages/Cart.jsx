import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/NavBar';

function Cart() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }

    // Load order data from localStorage
    const storedOrder = localStorage.getItem('currentOrder');
    if (!storedOrder) {
      navigate('/upload');
      return;
    }

    try {
      const parsedOrder = JSON.parse(storedOrder);
      setOrderData(parsedOrder);
    } catch (error) {
      console.error('Error parsing order data:', error);
      navigate('/upload');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, navigate]);

  const calculatePrice = () => {
    if (!orderData) return 0;
    
    let basePrice = 0;
    const { specifications } = orderData;
    
    // Base price per page
    basePrice += 2; // $2 per page
    
    // Paper type adjustments
    const paperTypePrices = {
      glossy: 1,
      matte: 0.5,
      satin: 0.75,
      bond: 0.25,
      photo: 2
    };
    basePrice += paperTypePrices[specifications.paperType] || 0;
    
    // Color adjustments
    if (specifications.color === 'color') {
      basePrice += 1;
    }
    
    // Binding adjustments
    const bindingPrices = {
      none: 0,
      staples: 0.5,
      spiral: 3,
      perfect: 5
    };
    basePrice += bindingPrices[specifications.binding] || 0;
    
    // Multiply by quantity
    basePrice *= specifications.quantity;
    
    // Add file processing fee
    basePrice += orderData.files.length * 1;
    
    return basePrice;
  };

  const handlePlaceOrder = () => {
    // Store order with price
    const orderWithPrice = {
      ...orderData,
      price: calculatePrice(),
      userId: user.id,
      userEmail: user.email,
      userName: user.name
    };
    
    localStorage.setItem('orderForPayment', JSON.stringify(orderWithPrice));
    navigate('/payment');
  };

  const handleBackToUpload = () => {
    navigate('/upload');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-yellow-400"></div>
          <p className="mt-4 text-white">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return null;
  }

  const totalPrice = calculatePrice();

  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">🛒 Your Cart</h1>
            <p className="text-gray-300 text-lg">Review your order details before proceeding to payment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Files Section */}
              <div className="bg-base-200 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4"> Files to Print</h2>
                <div className="space-y-3">
                  {orderData.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-base-300 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">📄</span>
                        <div>
                          <p className="text-white font-medium">{file.name}</p>
                          <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Section */}
              <div className="bg-base-200 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4"> Print Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-base-300 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Paper Size</p>
                    <p className="text-white font-medium">{orderData.specifications.paperSize}</p>
                  </div>
                  <div className="bg-base-300 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Paper Type</p>
                    <p className="text-white font-medium capitalize">{orderData.specifications.paperType}</p>
                  </div>
                  <div className="bg-base-300 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Quantity</p>
                    <p className="text-white font-medium">{orderData.specifications.quantity}</p>
                  </div>
                  <div className="bg-base-300 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Color</p>
                    <p className="text-white font-medium capitalize">{orderData.specifications.color.replace('-', ' ')}</p>
                  </div>
                  <div className="bg-base-300 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Binding</p>
                    <p className="text-white font-medium capitalize">{orderData.specifications.binding}</p>
                  </div>
                </div>
                
                {orderData.specifications.specialInstructions && (
                  <div className="mt-4 bg-base-300 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Special Instructions</p>
                    <p className="text-white">{orderData.specifications.specialInstructions}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-base-200 rounded-2xl p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Base Price</span>
                    <span className="text-white">$2.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Paper Type ({orderData.specifications.paperType})</span>
                    <span className="text-white">
                      ${orderData.specifications.paperType === 'glossy' ? '1.00' : 
                        orderData.specifications.paperType === 'matte' ? '0.50' :
                        orderData.specifications.paperType === 'satin' ? '0.75' :
                        orderData.specifications.paperType === 'bond' ? '0.25' : '2.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Color ({orderData.specifications.color})</span>
                    <span className="text-white">
                      ${orderData.specifications.color === 'color' ? '1.00' : '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Binding ({orderData.specifications.binding})</span>
                    <span className="text-white">
                      ${orderData.specifications.binding === 'staples' ? '0.50' :
                        orderData.specifications.binding === 'spiral' ? '3.00' :
                        orderData.specifications.binding === 'perfect' ? '5.00' : '0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Quantity</span>
                    <span className="text-white">× {orderData.specifications.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">File Processing</span>
                    <span className="text-white">${orderData.files.length}.00</span>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-yellow-400">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handlePlaceOrder}
                    className="btn btn-lg bg-yellow-400 text-black hover:bg-yellow-300 border-0 font-bold w-full rounded-xl"
                  >
                    Place Order & Pay
                  </button>
                  <button
                    onClick={handleBackToUpload}
                    className="btn btn-outline border-2 border-gray-400 text-white hover:bg-gray-400 hover:text-black w-full rounded-xl"
                  >
                    Back to Upload
                  </button>
                </div>

                {/* Delivery Info */}
                <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <h3 className="text-white font-semibold mb-2">Delivery Information</h3>
                  <p className="text-gray-300 text-sm">
                    Standard delivery: 2-3 business days<br />
                    Express delivery available at checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
