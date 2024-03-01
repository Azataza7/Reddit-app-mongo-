import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../Features/Posts/PostsSlice';
import { userReducer } from '../Features/Users/usersSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: userReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;