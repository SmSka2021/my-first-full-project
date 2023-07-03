/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Todo } from '../../interfaces/interfaces';
import userAPI from '../../api-wrapper/registration-api';

const fetchAddTodo = createAsyncThunk(
  'usersSlice/fetchAddTodo',
  async (data: {idUser: string, todo: Todo}, { rejectWithValue }) => {
    try {
      const response = await userAPI.addTodoUser(data.idUser, data.todo);
      if (response.status === 201) {
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
export default fetchAddTodo;
