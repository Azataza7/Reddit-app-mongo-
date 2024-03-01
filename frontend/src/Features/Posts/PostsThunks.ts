import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { PostDetailType, Posts } from '../../../types';

export const getPosts = createAsyncThunk<Posts[], void>(
  'posts/getPosts',
  async () => {
    const response = await axiosApi.get('post');

    return response.data;
  }
);

export const getPostById = createAsyncThunk<PostDetailType, string>(
  'posts/getById',
  async (postId) => {
    const response = await axiosApi.get(`post/${postId}`);

    return response.data;
  }
);