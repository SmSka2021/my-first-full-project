/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserAuth } from '../../interfaces/interfaces';
import userAPI from '../../api-wrapper/registration-api';

const fetchAuthorizeUser = createAsyncThunk(
  'usersSlice/fetchAuthorizeUser',
  async (data: UserAuth, { rejectWithValue }) => {
    try {
      const response = await userAPI.authUser(data);
      if (response.status === 201) {
        return { status: response.status, data: response.data };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          console.log('error, data is not found');
          throw rejectWithValue(500);
        }
        if (error.response?.status === 401) {
          console.log('error, User not exists');
          throw rejectWithValue(401);
        }
        throw error;
      } else {
        console.log('This is not axios error');
        return rejectWithValue('This is not axios error');
      }
    }
  },
);
export default fetchAuthorizeUser;
