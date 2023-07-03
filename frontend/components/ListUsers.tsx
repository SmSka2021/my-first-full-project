import * as React from 'react';
import OneUser from './OneUser';
import { UserFull } from '../interfaces/interfaces';

type Props = {
  items: UserFull[]
}

function ListUsers({ items }: Props) {
  return (
    <ul className="flex flex-wrap gap-[15px] py-[25px] justify-center">
      {items.map((item, idx) => (
        <li key={item.nickName}>
          <OneUser user={item} index={idx} />
        </li>
      ))}
    </ul>
  );
}

export default ListUsers;
