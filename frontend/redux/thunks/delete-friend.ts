/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import userAPI from '../../api-wrapper/registration-api';

const fetchDeleteFriend = createAsyncThunk(
  'usersSlice/fetchDeleteFriend',
  async (data: {idUser: string, idFriend: string}, { rejectWithValue }) => {
    try {
      const response = await userAPI.deleteFriend(data.idUser, data.idFriend);
      if (response.status === (200)) {
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

export default fetchDeleteFriend;
