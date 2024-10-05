import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:5001', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;