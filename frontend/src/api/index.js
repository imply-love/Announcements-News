import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log('Request token from localStorage:', token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Authorization header set:', `Bearer ${token}`);
    } else {
        console.log('No token found in localStorage');
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;