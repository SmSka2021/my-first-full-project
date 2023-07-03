/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../redux/hooks';
import { Todo } from '../interfaces/interfaces';
import { getIdUser } from '../utils/utilites/decoder-jwt';
import {
  maxLength300,
  maxLength50,
  minLength5,
} from '../utils/constants/const-breakpoint';
import { schemaTodo } from '../utils/validation/shema-todo';
import fetchAddTodo from '../redux/thunks/add-todo';

function FormAddTodo() {
  const dispatchApi = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Todo>({
    resolver: yupResolver(schemaTodo),
    mode: 'onChange',
  });

  const onSubmit = async (data: Todo) => {
    if (isDirty && isValid) {
      const res: PayloadAction<any> = await dispatchApi(
        fetchAddTodo({ idUser: getIdUser(), todo: data }),
      );
      if (res.payload) {
        if (res.payload.status === 201) reset();
      }
    }
  };

  return (
    <div className="add-todo-wrap w-full bg-blue-900 border-4 rounded-xl px-[20px] py-[5px]">
      <form
        className="add-todo relative flex justify-between items-center  mt-[15px] w-full flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-white  text-sm font-madium self-start mt-[10px] title-add-todo">
          Создать доброе дело
        </h2>
        <div className="w-[200px] h-[60px] wrap-inp-todo">
          <input
            type="text"
            placeholder="Название..."
            {...register('title')}
            required
            maxLength={maxLength50}
            minLength={minLength5}
            className={`input-form-todo w-[200px]  ${
              errors.title ? 'bg-[#FFEDD7]' : ''
            }`}
          />
          {errors.title && (
            <p className="err-todo text-xs text-red-200 mt-[5px]">
              {errors?.title?.message}
            </p>
          )}
        </div>
        <div className="w-[50%] h-[60px] wrap-inp-todo">
          <textarea
            placeholder="Описание..."
            {...register('description')}
            required
            minLength={minLength5}
            maxLength={maxLength300}
            className={`input-form-todo w-full resize-none scroll-smooth py-[0.32rem] ${
              errors.description ? 'bg-[#FFEDD7]' : ''
            }`}
          />
          {errors.description && (
            <p className="err-todo text-xs text-red-200">
              {errors?.description?.message}
            </p>
          )}
        </div>
        <button
          disabled={!isValid}
          type="submit"
          className="btn-light self-start cursor-pointer disabled:text-gray-400 btn-add-todo"
        >
          Создать
        </button>
      </form>
    </div>
  );
}
export default FormAddTodo;
