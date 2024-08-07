import api from './axios';

const setAuthToken = token => {
	if ( token ) {
		api.defaults.headers.common.Authorization = `Bearer ${ token }`;
	} else {
		delete api.defaults.headers.common.Authorization;
	}
};

export default setAuthToken;
