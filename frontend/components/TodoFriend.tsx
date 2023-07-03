/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { TodoInterface } from '../interfaces/interfaces';
import NotFound from './NotFound';
import { textTodoFriends, titleTodoFriends } from '../utils/constants/message';
import CardFriendTodo from './CardFriendTodo';

function TodoFriend(props: {friendTodo: TodoInterface[] }) {
  const { friendTodo } = props;
  return (
    <section>
      {friendTodo.length === 0 && <NotFound title={titleTodoFriends} text={textTodoFriends} />}
      {friendTodo.length > 0
       && (
       <div className="flex flex-wrap py-4 justify-center gap-5">
         {friendTodo.map((oneTodo) => (
           <div key={oneTodo._id}>
             <CardFriendTodo todo={oneTodo} />
           </div>
         ))}
       </div>
       )}
    </section>
  );
}

export default TodoFriend;
