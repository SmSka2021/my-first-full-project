/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import Link from 'next/link';
import { PayloadAction } from '@reduxjs/toolkit';
import { UserFull } from '../interfaces/interfaces';
import { useAppDispatch } from '../redux/hooks';
import fetchDeleteFriend from '../redux/thunks/delete-friend';
import { messageConfirmDelFriend } from '../utils/constants/message';
import { getIdUser } from '../utils/utilites/decoder-jwt';
import ModalConfirm from './ModalConfirm';
import icon from '../public/assets/img/men.png';
import fetchGetAllUsers from '../redux/thunks/get-all-users';

function CardFriend(props: { friend: UserFull }) {
  const { friend } = props;
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const dispatchApi = useAppDispatch();

  const closeModalConfirm = () => {
    setIsShowConfirmModal(false);
  };

  const deleteFriend = async () => {
    closeModalConfirm();
    const res: PayloadAction<any> = await dispatchApi(
      fetchDeleteFriend({ idUser: getIdUser(), idFriend: friend._id as string }),
    );
    if (res.payload) {
      if (res.payload.status === 200) {
        await dispatchApi(fetchGetAllUsers());
      }
    }
  };

  const openModalConfirm = () => {
    setIsShowConfirmModal(true);
  };

  return (
    <div className="flex flex-col justify-between h-full break-words rounded-lg hyphens-manual self-stretch relative p-6 shadow-xl w-[250px] hover:shadow-2xl bg-white border-gray-300 border">
      <div className="flex gap-3 items-end mb-3">
        <img className="w-7 h-7 mr-2" src={icon.src} alt="icon" />
        <span className="text-[16px] font-bold  w-[80%] text-blue-900">
          {friend.nickName}
        </span>
      </div>
      <button
        type="button"
        onClick={() => openModalConfirm()}
        className="delete-btn absolute right-[10px] top-[20px] border-none"
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
      <p className="mb-4 self-stretch text-sm text-blue-800">
        <span className="text-[12px] text-gray-800">Email: </span>
        {friend.email}
      </p>
      <div className="flex justify-between items-end">
        <button
          type="button"
          className="w-full inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium  text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600"
        >
          <Link
            href="/users/[id]"
            as={`/users/${friend.nickName}`}
            className="text-white font-medium cursor-pointer hover:text-yellow-200"
          >
            Посмотреть добрые дела
          </Link>
        </button>
      </div>
      {isShowConfirmModal && (
        <div className="wrapper-mess">
          <div className="wrapper" />
          <ModalConfirm
            text={messageConfirmDelFriend}
            closeForm={closeModalConfirm}
            confirmDel={deleteFriend}
          />
        </div>
      )}
    </div>
  );
}
export default CardFriend;
