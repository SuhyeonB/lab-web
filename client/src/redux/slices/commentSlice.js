import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/axios';

// 댓글 조회
export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId, thunkAPI) => {
    try{
        const response = await api.get(`/api/comments/${postId}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        }
        return thunkAPI.rejectWithValue('Failed to fetch comments');
    }
});

// 댓글 생성
export const createComment = createAsyncThunk('comments/createComment', async (comment) => {
    const response = await api.post('/api/comments', comment);
    return response.data;
});

// 댓글 수정
export const updateComment = createAsyncThunk('comments/updateComment', async ({ commentId, commentData }) => {
    const response = await api.patch(`/api/comments/${commentId}`, commentData);
    return response.data;
});

// 댓글 삭제
export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId) => {
    await api.delete(`/api/comments/${commentId}`);
    return commentId;
});

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
            state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
            state.error = action.payload;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const index = state.comments.findIndex(comment => comment._id === action.payload._id);
                state.comments[index] = action.payload;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(comment => comment._id !== action.payload);
            });
    }
});

export default commentSlice.reducer;