// src/axiosConfig.ts
import axios from 'axios';

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
