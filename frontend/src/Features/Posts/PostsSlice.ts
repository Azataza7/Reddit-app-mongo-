import { createSlice } from '@reduxjs/toolkit';
import { PostDetailType, Posts } from '../../../types';
import { getPostById, getPosts } from './PostsThunks';
import { RootState } from '../../app/store';

interface postsState {
  posts: Posts[];
  postDetail: PostDetailType | null;

  postsOnLoading: boolean;
  postDetailLoading: boolean;
}

const initialState: postsState = {
  posts: [],
  postDetail: null,

  postsOnLoading: false,
  postDetailLoading: false,
};

const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setState: (state: postsState, {payload: posts}) => {
      state.posts = posts;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state: postsState) => {
      state.postsOnLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state: postsState, {payload: posts}) => {
      state.posts = posts;
      state.postsOnLoading = false;
    });
    builder.addCase(getPosts.rejected, (state: postsState, {payload: error}) => {
      state.postsOnLoading = false;
    });

    builder.addCase(getPostById.pending, (state: postsState) => {
      state.postDetailLoading = true;
    });
    builder.addCase(getPostById.fulfilled, (state: postsState, {payload: post}) => {
      state.postDetail = post;
      state.postDetailLoading = false;
    });
    builder.addCase(getPostById.rejected, (state: postsState, {payload: error}) => {
      state.postDetailLoading = false;
    });
  }
});

export const postsReducer = PostsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostDetail = (state: RootState) => state.posts.postDetail;

export const selectLoadingPostDetail = (state: RootState) => state.posts.postDetailLoading;
export const selectLoadingPosts = (state: RootState) => state.posts.postsOnLoading;