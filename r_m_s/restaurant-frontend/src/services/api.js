import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/orders';

export const orderService = {
  placeOrder: async (userId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/place/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      throw error;
    }
  },
  
  getOrdersByUser: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data || error.message);
      throw error;
    }
  }
};

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  // Add other auth endpoints
};

// Menu API
export const menuAPI = {
  getItems: () => api.get('/menu'),
  // Add other menu endpoints
};

// Order API
export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getHistory: () => api.get('/orders/history'),
  // Add other order endpoints
};