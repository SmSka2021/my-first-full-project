/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useDispatch } from 'react-redux';
import { FuncData, TodoInterface } from '../interfaces/interfaces';
import { useAppSelector } from '../redux/hooks';
import { oneUserSelector } from '../redux/selectors/user-selector';
import { setCheckedTodo } from '../redux/reducers/user-reducer';
import converterDate from '../utils/utilites/converter-date';
import edit from '../public/assets/img/edit-pencil.png';

function CardTodo(props: {
  todo: TodoInterface;
  openConfirmModal: FuncData;
  editTodo: FuncData;
}) {
  const { todo, editTodo, openConfirmModal } = props;
  const user = useAppSelector(oneUserSelector);
  const dispatch = useDispatch();

  const editOneTask = (idTodo: string) => {
    const todoUser = user.tasks.find((task) => task._id === idTodo);
    dispatch(setCheckedTodo({ todo: todoUser }));
    editTodo(idTodo);
  };

  return (
    <div className="fone-card fone-img">
      <div className="w-full flex flex-col justify-between">
        <div className="flex justify-between w-full">
          <p className="mb-2 text-base font-medium  w-[80%] text-blue-950">
            <span>🌞</span>
            {todo.title}
          </p>
          <div className="flex gap-2 items-start">
            <button
              type="button"
              onClick={() => openConfirmModal(todo._id)}
              className=" border-none"
              title="Удалить"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="hover:fill-red-700"
                  d="M6 21H18V7H6V21ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                  fill="grey"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => editOneTask(todo._id)}
              className="border-none hover:opasity-50"
            >
              <img
                className="w-6 h-6 hover:opacity-50"
                src={edit.src}
                alt="icon edit"
              />
            </button>
          </div>
        </div>
        <p className="mb-4 self-stretch text-sm text-blue-800">
          {todo.description}
        </p>
        <div>
          <p className="text-[11px] text-gray-600">
            создано:
            <span className="text-[12px] text-gray-800">
              {converterDate(todo.createdAt)}
            </span>
          </p>
          <p className="text-[11px] text-gray-600">
            обновлено:
            <span className="text-[12px] text-gray-800">
              {converterDate(todo.updatedAt)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default CardTodo;
