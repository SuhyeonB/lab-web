import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

// 게시물 전체
export const fetchPosts = createAsyncThunk( 'posts/fetchPosts', async () => {
	const response = await api.get( '/api/posts' );
	return response.data;
} );

// 하나
export const fetchPost = createAsyncThunk( 'posts/fetchPost', async postId => {
	const response = await api.get( `/api/posts/${ postId }` );
	return response.data;
} );

// 생성
export const createPost = createAsyncThunk( 'posts/createPost', async post => {
	const response = await api.post( '/api/posts', post );
	return response.data;
} );

// 수정
export const updatePost = createAsyncThunk( 'posts/updatePost', async ( { postId, post } ) => {
	const response = await api.patch( `/api/posts/${ postId }`, post );
	return response.data;
} );

// 삭제
export const deletePost = createAsyncThunk( 'posts/deletePost', async postId => {
	await api.delete( `/api/posts/${ postId }` );
	return postId;
} );

const postsSlice = createSlice( {
	name: 'posts',
	initialState: {
		posts: [],
		post: null,
		status: 'idle',
		error: null
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase( fetchPosts.pending, state => {
				state.status = 'loading';
			} )
			.addCase( fetchPosts.fulfilled, ( state, action ) => {
				state.status = 'succeeded';
				state.posts = action.payload;
			} )
			.addCase( fetchPosts.rejected, ( state, action ) => {
				state.status = 'failed';
				state.error = action.error.message;
			} )
			.addCase( fetchPost.fulfilled, ( state, action ) => {
				state.post = action.payload;
			} )
			.addCase( createPost.fulfilled, ( state, action ) => {
				state.posts.push( action.payload );
			} )
			.addCase( updatePost.fulfilled, ( state, action ) => {
				const index = state.posts.findIndex( post => post._id === action.payload._id );
				state.posts[ index ] = action.payload;
			} )
			.addCase( deletePost.fulfilled, ( state, action ) => {
				state.posts = state.posts.filter( post => post._id !== action.payload );
			} );
	}
} );

export default postsSlice.reducer;