import axios from 'axios';
import { refreshAccessToken } from './auth'; 

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

// 1. 로그인 되어 있다면 axios 요청에 access_token 포함
api.interceptors.request.use(async config => {
    const token = sessionStorage.getItem('access_token'); 
    if (token) { // token 있음. 로그인되어 있음
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
        if (!originalRequest._retry) {
            originalRequest._retry = true; // 첫 실패에서만 재시도
            const newToken = await refreshAccessToken();
            if (newToken) {
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return api(originalRequest); // 토큰 갱신 성공 시 재요청
            }
        }
        
        sessionStorage.clear();
        window.location.replace('/');
    }
    return Promise.reject(error);
});

export default api;
