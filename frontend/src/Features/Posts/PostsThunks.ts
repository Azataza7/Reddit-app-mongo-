import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { PostDetailType, Posts, userPost, ValidationError } from '../../../types';
import { isAxiosError } from 'axios';

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

export const createPost = createAsyncThunk<void, userPost, { rejectValue: ValidationError }>(
  'posts/new',
  async (data, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);

      if (data.description) {
        formData.append('description', data.description);
      }

      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await axiosApi.post('/post', formData, {
        headers: {
          Authorization: data.token
        }
      });
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);