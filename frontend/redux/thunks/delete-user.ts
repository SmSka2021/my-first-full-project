/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import userAPI from '../../api-wrapper/registration-api';

const fetchDeleteUser = createAsyncThunk(
  'usersSlice/fetchDeleteUser',
  async (data: string, { rejectWithValue }) => {
    try {
      const response = await userAPI.removeUser(data);
      if (response.status === 200) {
        return { status: response.status, data: response.data };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          console.log('error, data is not found');
          throw rejectWithValue(500);
        }
        throw error;
      } else {
        console.log('This is not axios error');
        return rejectWithValue('This is not axios error');
      }
    }
  },
);

export default fetchDeleteUser;
