/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Func, Todo } from '../interfaces/interfaces';
import {
  maxLength300,
  maxLength50,
  minLength5,
} from '../utils/constants/const-breakpoint';
import { todoSelector } from '../redux/selectors/user-selector';
import { getIdUser } from '../utils/utilites/decoder-jwt';
import { schemaTodo } from '../utils/validation/shema-todo';
import Loader from './Loader';
import fetchUpdateTodo from '../redux/thunks/update-todo';

export function FormUpdTodo(props: { idTodo: string; closeForm: Func }) {
  const { closeForm } = props;
  const todo = useAppSelector(todoSelector);
  const dispatchApi = useAppDispatch();

  const {
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Todo>({
    resolver: yupResolver(schemaTodo),
    mode: 'onChange',
    defaultValues: {
      title: todo?.title,
      description: todo?.description,
    },
  });

  const onSubmit = async (data: Todo) => {
    if (isDirty && isValid) {
      const res: PayloadAction<any> = await dispatchApi(
        fetchUpdateTodo({
          idUser: getIdUser(),
          idTodo: todo._id,
          newTodo: data,
        }),
      );
      if (res.payload) {
        if (res.payload.status === 200) {
          closeForm();
          reset();
        }
      }
    }
  };

  const isChangeTodo = () => {
    if (todo?._id) {
      return (
        (todo.title !== getValues('title')
          || todo.description !== getValues('description'))
        && isValid
      );
    }
    return false;
  };

  if (!todo._id) {
    return <Loader />;
  }

  return (
    <div className="w-max relative z-40">
      <div className="w-max relative">
        <h2 className="reg-head">Редактировать</h2>
        <button
          type="button"
          className="absolute top-2.5 right-2.5 rounded-full border-2 border-white w-5 h-5 text-xs  text-white font-bold  hover:text-blue-200 hover:border-blue-200"
          onClick={() => closeForm()}
        >
          X
        </button>
      </div>
      <fieldset className="block p-5 bg-white border-2 border-solid outline-gray-700 shadow">
        <form
          className="relative flex-col flex justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Название..."
            {...register('title')}
            required
            maxLength={maxLength50}
            minLength={minLength5}
            className={`input-form ${errors.title ? 'bg-[#FFEDD7]' : ''}`}
          />
          {errors.title && (
            <p className=" text-xs text-red-700 mt-[5px]">{errors?.title?.message}</p>
          )}
          <textarea
            placeholder="Описание..."
            {...register('description')}
            required
            minLength={minLength5}
            maxLength={maxLength300}
            className={`input-form resize-none scroll-smooth py-[0.32rem] ${
              errors.description ? 'bg-[#FFEDD7]' : ''
            }`}
          />
          {errors.description && (
            <p className=" text-xs text-red-700">
              {errors?.description?.message}
            </p>
          )}
          <button
            disabled={!isChangeTodo()}
            type="submit"
            className="btn btn-blue mt-3 w-64 mb-3"
          >
            Сохранить
          </button>
        </form>
      </fieldset>
    </div>
  );
}
export default FormUpdTodo;
