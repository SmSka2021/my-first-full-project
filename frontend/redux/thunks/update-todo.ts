/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import userAPI from '../../api-wrapper/registration-api';
import { Todo } from '../../interfaces/interfaces';

const fetchUpdateTodo = createAsyncThunk(
  'usersSlice/fetchUpdateTodo',
  async (data: {idUser: string, idTodo: string, newTodo: Todo}, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateTodoUser(data.idUser, data.idTodo, data.newTodo);
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

export default fetchUpdateTodo;
