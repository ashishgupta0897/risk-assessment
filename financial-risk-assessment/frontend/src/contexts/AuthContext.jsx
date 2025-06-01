import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`);
      setCurrentUser(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching current user:', error);
      logout();
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, userData);
      
      if (res.data.success) {
        setToken(res.data.token);
        setCurrentUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        return { success: true };
      }
      
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle different types of errors
      if (error.response && error.response.data) {
        return { 
          success: false, 
          error: error.response.data.error || 'Registration failed' 
        };
      } else if (error.request) {
        return { 
          success: false, 
          error: 'Network error. Please check your connection.' 
        };
      } else {
        return { 
          success: false, 
          error: 'An unexpected error occurred' 
        };
      }
    }
  };

  const login = async (credentials) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials);
      
      if (res.data.success) {
        setToken(res.data.token);
        setCurrentUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        return { success: true };
      }
      
      return { success: false, error: 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different types of errors
      if (error.response && error.response.data) {
        return { 
          success: false, 
          error: error.response.data.error || 'Invalid credentials' 
        };
      } else if (error.request) {
        return { 
          success: false, 
          error: 'Network error. Please check your connection.' 
        };
      } else {
        return { 
          success: false, 
          error: 'An unexpected error occurred' 
        };
      }
    }
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};