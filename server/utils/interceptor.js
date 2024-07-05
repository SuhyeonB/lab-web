import axios from 'axios';
import { verifyAccess, refreshAccessToken } from './auth';

const api = axios.create({
    baseURL: ''
});

api.interceptors.request.use(async config => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
        const isValid = await verifyAccess(accessToken);
        if (!isValid) {
            const newAccessToken = await refreshAccessToken();
            config.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;