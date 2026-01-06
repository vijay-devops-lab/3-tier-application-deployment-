const API_URL = 'http://localhost:5000/api';

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.success && response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.success && response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authAPI;
