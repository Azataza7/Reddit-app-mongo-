import { createAsyncThunk } from '@reduxjs/toolkit';
import { userComment, ValidationError } from '../../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const addComment = createAsyncThunk<void, userComment, {rejectValue: ValidationError}>(
  'comment/add',
  async (data, {rejectWithValue}) => {
    try {
      await axiosApi.post('/comment', data, {
        headers: {
          Authorization: data.token
        }
      });
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e
    }
  }
);