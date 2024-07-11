import axios from 'axios';
import { refreshAccessToken } from './auth';

const api = axios.create( {
	baseURL: 'http://localhost:8080'
} );

api.interceptors.request.use( config => {
	const accessToken = sessionStorage.getItem( 'access_token' );
	if ( accessToken ) {
		config.headers.Authorization = `Bearer ${ accessToken }`;
	}
	return config;
}, error => {
	return Promise.reject( error );
} );

api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;

		if ( error.response.status === 401 && !originalRequest._retry ) {
			originalRequest._retry = true;
			try {
				const accessToken = await refreshAccessToken();
				originalRequest.headers.Authorization = `Bearer ${ accessToken }`;
				return api( originalRequest );
			} catch ( err ) {
				sessionStorage.removeItem( 'access_token' );
				sessionStorage.removeItem( 'refresh_token' );
				return Promise.reject( err );
			}
		}

		return Promise.reject( error );
	}
);

export default api;
