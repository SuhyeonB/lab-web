import api from './axios';

export const refreshAccessToken = async () => {
	try {
		const refresh_token = sessionStorage.getItem( 'refresh_token' );
		const res = await api.post( '/api/users/refresh-token', { refresh_token } );
		sessionStorage.setItem( 'access_token', res.data.access_token );
		return res.data.access_token;
	} catch ( err ) {
		throw new Error( 'Failed to refresh access token' );
	}
};
