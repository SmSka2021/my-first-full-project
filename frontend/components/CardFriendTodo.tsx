import React from 'react';
import { TodoInterface } from '../interfaces/interfaces';
import converterDate from '../utils/utilites/converter-date';

function CardFriendTodo(props: {todo:TodoInterface}) {
  const { todo } = props;

  return (
    <div className="fone-img-todo">
      <p className="mb-2 text-base font-medium  text-blue-950">
        <span>🌞</span>
        {todo.title}
      </p>
      <p className="mb-4 self-stretch text-sm text-blue-800">{todo.description}</p>
      <p className="text-[11px] text-gray-600">
        создано:
        <span className="text-[12px] text-gray-800">{converterDate(todo.createdAt)}</span>
      </p>
      <p className="text-[11px] text-gray-600">
        обновлено:
        <span className="text-[12px] text-gray-800">{converterDate(todo.updatedAt)}</span>
      </p>
    </div>
  );
}
export default CardFriendTodo;
