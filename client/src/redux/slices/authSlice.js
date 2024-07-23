import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/axios';
import { refreshAccessToken } from '../../utils/auth';
import { redirect } from 'react-router-dom';

export const loadUser = createAsyncThunk( 'auth/loadUser', async ( _, thunkAPI ) => {
	const accessToken = sessionStorage.getItem( 'access_token' );
	if ( accessToken ) {
		api.defaults.headers.common.Authorization = `Bearer ${ accessToken }`;
	}

	try {
		const res = await api.get( '/api/users' );
		return res.data;
	} catch ( err ) {
		return thunkAPI.rejectWithValue( 'Failed to load user' );
	}
} );

export const signup = createAsyncThunk( 'auth/signup', async ( { name, email, password }, thunkAPI ) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify( { name, email, password } );

	try {
		const res = await api.post( '/api/users/signup', body, config );
		sessionStorage.setItem( 'access_token', res.data.access_token );
		sessionStorage.setItem( 'refresh_token', res.data.refresh_token );
		return res.data.access_token;
	} catch ( err ) {
		return thunkAPI.rejectWithValue( 'Failed to signup' );
	}
} );

export const signin = createAsyncThunk('auth/signin', async ({ email, password }, thunkAPI) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await api.post('/api/users/signin', body, config);
        sessionStorage.setItem('access_token', res.data.access_token);
        sessionStorage.setItem('refresh_token', res.data.refresh_token);
        return res.data.access_token;
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to sign in');
    }
});

export const refreshAccess = createAsyncThunk('auth/refreshAccess', async (_, thunkAPI) => {
    try {
        const accessToken = await refreshAccessToken();
        return accessToken;
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to refresh access token');
    }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (formData, thunkAPI) => {
    try {
        const response = await api.post('/api/users/update-profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.user; // 서버에서 업데이트된 사용자 정보 반환
    } catch (error) {
        return thunkAPI.rejectWithValue('Failed to update profile');
    }
});

export const signout = createAsyncThunk( 'auth/signout', async () => {
	sessionStorage.removeItem( 'access_token' );
	sessionStorage.removeItem( 'refresh_token' );
	redirect('/');
} );

export const deleteAccount = createAsyncThunk('auth/deleteAccount', async (_, thunkAPI) => {
    try {
        const response = await api.delete('/api/users/delete-account');
        // 세션에서 인증 토큰 삭제
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const authSlice = createSlice( {
	name: 'auth',
	initialState: {
		token: sessionStorage.getItem( 'access_token' ),
		isAuthenticated: null,
		loading: true,
		user: null
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase( loadUser.fulfilled, ( state, action ) => {
				state.isAuthenticated = true;
				state.loading = false;
				state.user = action.payload;
			} )
			.addCase( loadUser.rejected, state => {
				state.isAuthenticated = false;
				state.loading = false;
			} )
			.addCase( signup.fulfilled, ( state, action ) => {
				state.token = action.payload;
				state.isAuthenticated = true;
				state.loading = false;
			} )
			.addCase( signup.rejected, state => {
				state.isAuthenticated = false;
				state.loading = false;
			} )
			.addCase( signin.fulfilled, ( state, action ) => {
				state.token = action.payload;
				state.isAuthenticated = true;
				state.loading = false;
			} )
			.addCase( signin.rejected, state => {
				state.isAuthenticated = false;
				state.loading = false;
			} )
			.addCase( refreshAccess.fulfilled, ( state, action ) => {
				state.token = action.payload;
			} )
			.addCase( refreshAccess.rejected, state => {
				state.isAuthenticated = false;
				state.loading = false;
			} )
			.addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(updateProfile.rejected, (state) => {
                state.loading = false;
            })
			.addCase( signout.fulfilled, state => {
				state.token = null;
				state.isAuthenticated = false;
				state.loading = false;
				state.user = null;
			} )
			.addCase(deleteAccount.fulfilled, (state) => {
                state.token = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.user = null;
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                console.error('Delete account failed:', action.payload);
            });
	}
} );

export default authSlice.reducer;