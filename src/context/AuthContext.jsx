import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, checkDatabaseHealth } from '../services/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [dbStatus, setDbStatus] = useState({ status: 'checking', state: 'unknown' });

  // Check database health and user authentication on app load
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check database health first
        console.log(' Initializing application...');
        const healthCheck = await checkDatabaseHealth();
        setDbStatus(healthCheck.database);
        
        // Then check user authentication
        if (token) {
          try {
            const response = await authAPI.verifyToken(token);
            const data = response.data;

            if (data.success) {
              setUser(data.data.user);
              console.log('User authenticated successfully');
            } else {
              // Token is invalid, remove it
              localStorage.removeItem('token');
              setToken(null);
              console.log('Invalid token removed');
            }
          } catch (error) {
            console.error('Auth check error:', error);
            localStorage.removeItem('token');
            setToken(null);
          }
        } else {
          console.log('No authentication token found');
        }
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const data = response.data;

      if (data.success) {
        const userData = data.data.user;
        const userToken = data.data.token;
        
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('token', userToken);
        
        console.log('Login successful');
        return { success: true, user: userData };
      } else {
        console.log('Login failed:', data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const data = response.data;

      if (data.success) {
        const newUser = data.data.user;
        const userToken = data.data.token;
        
        setUser(newUser);
        setToken(userToken);
        localStorage.setItem('token', userToken);
        
        console.log(' Signup successful');
        return { success: true, user: newUser };
      } else {
        console.log(' Signup failed:', data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    console.log('User logged out');
  };

  const value = {
    user,
    loading,
    dbStatus,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
