import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = authAPI.getUser();
    
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    setUser(response.data.user);
    return response;
  };

  const register = async (userData) => {
    const response = await authAPI.register(userData);
    setUser(response.data.user);
    return response;
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
