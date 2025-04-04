// AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../service/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Try to get user data first
          const response = await axiosInstance.get('/api/auth/test/user');
          
          // If user is admin, try to get admin data
          if (response.data.type === '1') {
            const adminResponse = await axiosInstance.get('/api/auth/test/admin');
            setUser(adminResponse.data);
          } else {
            setUser(response.data);
          }
        } catch (error) {
          console.error('Authentication check failed:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    
    initializeAuth();
  }, []);

  const register = async (userData) => {
    try {
      const response = await axiosInstance.post('/api/auth/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed',
        error: error.response?.data 
      };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', credentials);
      const { accessToken, ...userData } = response.data;
      
      localStorage.setItem('token', accessToken);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed',
        error: error.response?.data
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Optional: You might want to add a logout API call here
    // axiosInstance.post('/api/auth/logout');
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.type === '1'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};