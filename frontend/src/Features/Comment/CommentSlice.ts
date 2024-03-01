import { createSlice } from '@reduxjs/toolkit';
import { addComment } from './CommentThunks';
import { RootState } from '../../app/store';

interface commentState {
  commentLoading: boolean;
}

const initialState: commentState = {
  commentLoading: false,
};

const CommentSlice = createSlice({
  name: 'comment',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addComment.pending, (state: commentState) => {
      state.commentLoading = true;
    });
    builder.addCase(addComment.fulfilled, (state: commentState) => {
      state.commentLoading = false;
    });
    builder.addCase(addComment.rejected, (state: commentState) => {
      state.commentLoading = false;
    });
  }
});

export const commentReducer = CommentSlice.reducer;

export const selectCommentLoading = (state: RootState) => state.comments.commentLoading;
