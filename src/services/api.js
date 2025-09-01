import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Database health check
export const checkDatabaseHealth = async () => {
  try {
    console.log('🔍 Checking database connection...');
    const response = await api.get('/health');
    const { database, status } = response.data;
    
    if (database.status === 'healthy') {
      console.log('✅ Database is connected and healthy');
      console.log(`   State: ${database.state}`);
      console.log(`   Ready State: ${database.readyState}`);
    } else {
      console.warn('⚠️ Database connection issues detected');
      console.warn(`   State: ${database.state}`);
      console.warn(`   Ready State: ${database.readyState}`);
    }
    
    return {
      success: true,
      database,
      serverStatus: status
    };
  } catch (error) {
    console.error('❌ Failed to check database health:', error.message);
    return {
      success: false,
      error: error.message,
      database: { status: 'unknown', state: 'error' }
    };
  }
};

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verifyToken: (token) => api.post('/auth/verify-token', { token }),
};

// Orders API calls
export const ordersAPI = {
  placeOrder: (orderData) => api.post('/orders/place', orderData),
  createPayment: (paymentData) => api.post('/orders/payment', paymentData),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  getOrder: (orderId) => api.get(`/orders/${orderId}`),
};

export default api;
