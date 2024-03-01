import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../Features/Posts/PostsSlice';
import { userReducer } from '../Features/Users/usersSlice';
import { commentReducer } from '../Features/Comment/CommentSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: userReducer,
    comments: commentReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;