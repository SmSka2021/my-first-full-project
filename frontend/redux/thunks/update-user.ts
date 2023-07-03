/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import userAPI from '../../api-wrapper/registration-api';
import { UserRegistr } from '../../interfaces/interfaces';

const fetchUpdateUser = createAsyncThunk(
  'usersSlice/fetchUpdateUser',
  async (data: {idUser: string, user: UserRegistr}, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateUser(data.idUser, data.user);
      if (response.status === 200) {
        return { status: response.status, data: response.data };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          console.log('error, data is not found');
          throw rejectWithValue(500);
        }
        if (error.response?.status === 400) {
          console.log('error, User already exists');
          throw rejectWithValue(400);
        }
        throw error;
      } else {
        console.log('This is not axios error');
        return rejectWithValue('This is not axios error');
      }
    }
  },
);

export default fetchUpdateUser;
