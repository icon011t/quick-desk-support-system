// src/services/api.js
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('quickdesk_user'));

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: user ? `Bearer ${user.token}` : ''
  }
});

export default api;
