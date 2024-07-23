import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import authReducer from './slices/authSlice';
import commentReducer from './slices/commentSlice';

const store = configureStore( {
	reducer: {
		auth: authReducer,
		posts: postReducer,
		comments: commentReducer
	}
} );

export default store;