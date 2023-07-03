/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import userAPI from '../../api-wrapper/registration-api';
import { UserRegistr } from '../../interfaces/interfaces';

const fetchRegistrationUser = createAsyncThunk(
  'usersSlice/fetchRegistrationUser',
  async (data: UserRegistr, { rejectWithValue }) => {
    try {
      const response = await userAPI.registerUser(data);
      if (response.status === 201) {
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

export default fetchRegistrationUser;
