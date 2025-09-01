import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';
import NavBar from '../components/NavBar';

function Payment() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    phoneNumber: ''
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }

    // Load order data from localStorage
    const storedOrder = localStorage.getItem('orderForPayment');
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

  const handlePaymentDetailChange = (field, value) => {
    setPaymentDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validatePaymentDetails = () => {
    if (paymentMethod === 'card') {
      return paymentDetails.cardNumber && paymentDetails.expiryDate && 
             paymentDetails.cvv && paymentDetails.cardholderName;
    } else if (paymentMethod === 'upi') {
      return paymentDetails.upiId;
    } else if (paymentMethod === 'cod') {
      return paymentDetails.phoneNumber;
    }
    return false;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!validatePaymentDetails()) {
      alert('Please fill in all required payment details');
      return;
    }

    setProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create order object for backend
      const orderPayload = {
        customerId: user.id,
        shopkeeperId: '65f1234567890abcdef12345', // Default shopkeeper ID - in real app, this would be selected
        amount: orderData.price,
        files: orderData.files,
        specifications: orderData.specifications,
        paymentMethod,
        deliveryAddress: user.address || 'To be provided',
        contactNumber: paymentDetails.phoneNumber || user.phone || 'To be provided'
      };

      // Send order to backend
      const response = await ordersAPI.placeOrder(orderPayload);
      
      if (response.data.success) {
        // Save order to history
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        const orderWithId = {
          ...orderData,
          orderId: response.data.order._id,
          orderDate: new Date().toISOString(),
          paymentMethod,
          paymentStatus: 'completed',
          orderStatus: 'pending'
        };
        orderHistory.push(orderWithId);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
        
        // Clear localStorage
        localStorage.removeItem('currentOrder');
        localStorage.removeItem('orderForPayment');
        
        // Redirect to success page
        navigate('/order-success', { 
          state: { 
            orderId: response.data.order._id,
            orderData: orderWithId 
          } 
        });
      } else {
        throw new Error('Failed to place order');
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };



  const handleBackToCart = () => {
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-yellow-400"></div>
          <p className="mt-4 text-white">Loading payment...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">💳 Payment</h1>
            <p className="text-gray-300 text-lg">Complete your payment to place your order</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="space-y-6">
              <div className="bg-base-200 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
                
                {/* Payment Method Selection */}
                <div className="space-y-4 mb-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="radio radio-primary"
                    />
                    <span className="text-white">💳 Credit/Debit Card</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="radio radio-primary"
                    />
                    <span className="text-white">📱 UPI Payment</span>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="radio radio-primary"
                    />
                    <span className="text-white"> Cash on Delivery</span>
                  </label>
                </div>

                {/* Payment Details Form */}
                <form onSubmit={handlePayment} className="space-y-4">
                  {paymentMethod === 'card' && (
                    <>
                      <div>
                        <label className="label">
                          <span className="label-text text-white">Card Number</span>
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={paymentDetails.cardNumber}
                          onChange={(e) => handlePaymentDetailChange('cardNumber', e.target.value)}
                          className="input input-bordered w-full"
                          maxLength="19"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label">
                            <span className="label-text text-white">Expiry Date</span>
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentDetails.expiryDate}
                            onChange={(e) => handlePaymentDetailChange('expiryDate', e.target.value)}
                            className="input input-bordered w-full"
                            maxLength="5"
                          />
                        </div>
                        <div>
                          <label className="label">
                            <span className="label-text text-white">CVV</span>
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            value={paymentDetails.cvv}
                            onChange={(e) => handlePaymentDetailChange('cvv', e.target.value)}
                            className="input input-bordered w-full"
                            maxLength="4"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="label">
                          <span className="label-text text-white">Cardholder Name</span>
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={paymentDetails.cardholderName}
                          onChange={(e) => handlePaymentDetailChange('cardholderName', e.target.value)}
                          className="input input-bordered w-full"
                        />
                      </div>
                    </>
                  )}

                  {paymentMethod === 'upi' && (
                    <div>
                      <label className="label">
                        <span className="label-text text-white">UPI ID</span>
                      </label>
                      <input
                        type="text"
                        placeholder="username@upi"
                        value={paymentDetails.upiId}
                        onChange={(e) => handlePaymentDetailChange('upiId', e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div>
                      <label className="label">
                        <span className="label-text text-white">Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={paymentDetails.phoneNumber}
                        onChange={(e) => handlePaymentDetailChange('phoneNumber', e.target.value)}
                        className="input input-bordered w-full"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={processing || !validatePaymentDetails()}
                    className="btn btn-lg bg-yellow-400 text-black hover:bg-yellow-300 border-0 font-bold w-full rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? (
                      <>
                        <span className="loading loading-spinner loading-md"></span>
                        Processing Payment...
                      </>
                    ) : (
                      `Pay $${orderData.price.toFixed(2)}`
                    )}
                  </button>
                </form>
              </div>

              <button
                onClick={handleBackToCart}
                className="btn btn-outline border-2 border-gray-400 text-white hover:bg-gray-400 hover:text-black w-full rounded-xl"
              >
                Back to Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-base-200 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Order Total</span>
                    <span className="text-yellow-400 font-bold text-xl">${orderData.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-4">
                    <p className="text-gray-300 text-sm mb-2">Order Details:</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-white">• {orderData.files.length} file(s) to print</p>
                      <p className="text-white">• Paper: {orderData.specifications.paperSize} {orderData.specifications.paperType}</p>
                      <p className="text-white">• Color: {orderData.specifications.color}</p>
                      <p className="text-white">• Quantity: {orderData.specifications.quantity}</p>
                      <p className="text-white">• Binding: {orderData.specifications.binding}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-900/20 rounded-2xl p-6 border border-green-500/30">
                <h3 className="text-white font-semibold mb-2">Secure Payment</h3>
                <p className="text-gray-300 text-sm">
                  Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
                </p>
              </div>

              {/* Customer Support */}
              <div className="bg-blue-900/20 rounded-2xl p-6 border border-blue-500/30">
                <h3 className="text-white font-semibold mb-2">Need Help?</h3>
                <p className="text-gray-300 text-sm">
                  Contact our support team:<br />
                  📧 support@printsaarthi.com<br />
                  📱 +91 98765 43210
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
