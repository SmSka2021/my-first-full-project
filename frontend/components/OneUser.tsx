/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PayloadAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { UserFull } from '../interfaces/interfaces';
import avatar0 from '../public/assets/avatars/avatar_default.jpg';
import avatar1 from '../public/assets/avatars/avatar_1.jpg';
import avatar2 from '../public/assets/avatars/avatar_2.jpg';
import avatar3 from '../public/assets/avatars/avatar_3.jpg';
import avatar4 from '../public/assets/avatars/avatar_4.jpg';
import avatar5 from '../public/assets/avatars/avatar_5.jpg';
import avatar6 from '../public/assets/avatars/avatar_6.jpg';
import avatar7 from '../public/assets/avatars/avatar_7.jpg';
import avatar8 from '../public/assets/avatars/avatar_8.jpg';
import avatar9 from '../public/assets/avatars/avatar_9.jpg';
import avatar10 from '../public/assets/avatars/avatar_10.jpg';
import avatar11 from '../public/assets/avatars/avatar_11.jpg';
import avatar12 from '../public/assets/avatars/avatar_12.jpg';
import avatar13 from '../public/assets/avatars/avatar_13.jpg';
import avatar14 from '../public/assets/avatars/avatar_14.jpg';
import avatar15 from '../public/assets/avatars/avatar_15.jpg';
import avatar16 from '../public/assets/avatars/avatar_16.jpg';
import avatar17 from '../public/assets/avatars/avatar_17.jpg';
import avatar18 from '../public/assets/avatars/avatar_18.jpg';
import avatar19 from '../public/assets/avatars/avatar_19.jpg';
import avatar20 from '../public/assets/avatars/avatar_20.jpg';
import avatar21 from '../public/assets/avatars/avatar_21.jpg';
import avatar22 from '../public/assets/avatars/avatar_22.jpg';
import avatar23 from '../public/assets/avatars/avatar_23.jpg';
import avatar24 from '../public/assets/avatars/avatar_24.jpg';
import { useAppDispatch } from '../redux/hooks';
import fetchGetOneUserById from '../redux/thunks/get-user-by-id';
import { getIdUser, isAuth, isJwt } from '../utils/utilites/decoder-jwt';
import fetchAddFriend from '../redux/thunks/add-friend';
import { USER } from '../utils/constants/path';
import fetchGetAllUsers from '../redux/thunks/get-all-users';
import { saveLocalStorage } from '../utils/utilites/save-local-storage';

import { messageConfirmDelFriend } from '../utils/constants/message';
import fetchDeleteFriend from '../redux/thunks/delete-friend';
import ModalConfirm from './ModalConfirm';

function OneUser(props: { user: UserFull; index: number }) {
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const { user, index } = props;
  const dispatchApi = useAppDispatch();
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12, avatar13, avatar14, avatar15, avatar16, avatar17, avatar18, avatar19, avatar20, avatar21, avatar22, avatar23, avatar24];

  const idThisUser = getIdUser();
  const router = useRouter();

  useEffect(() => {
    if (!user.name && isJwt()) {
      dispatchApi(fetchGetOneUserById(getIdUser()));
    }
  }, []);

  const closeModalConfirm = () => {
    setIsShowConfirmModal(false);
  };

  const openModalConfirm = () => {
    setIsShowConfirmModal(true);
  };

  const setAvatar = (ind: number, idUser: string) => {
    if (idUser === getIdUser()) return avatar0.src;
    if (ind) return avatars[ind % 24].src;
    return avatars[0].src;
  };

  const saveAvatar = (ind: number, idUser: string) => {
    saveLocalStorage('avatarFriend', setAvatar(ind, idUser));
  };

  const isThisUser = (idUser: string): boolean => idUser === getIdUser();

  const isFriend = (): boolean => {
    if (isAuth()) {
      if (user.friends.length > 0) return user.friends.includes(getIdUser());
    }
    return false;
  };

  const addFriend = async (idFriend: string) => {
    if (idThisUser && idFriend) {
      const res: PayloadAction<any> = await dispatchApi(
        fetchAddFriend({ idUser: idThisUser, idFriend }),
      );
      if (res.payload) {
        if (res.payload.status === 201) {
          await dispatchApi(fetchGetAllUsers());
        }
      }
    }
  };
  const deleteFriend = async () => {
    closeModalConfirm();
    const res: PayloadAction<any> = await dispatchApi(
      fetchDeleteFriend({ idUser: idThisUser, idFriend: user._id as string }),
    );
    if (res.payload) {
      if (res.payload.status === 200) {
        await dispatchApi(fetchGetAllUsers());
      }
    }
  };

  return (
    <div className="card-user">
      <img
        className="w-20 rounded-full"
        src={setAvatar(index, user._id as string)}
        alt="Avatar"
      />
      <p className="my=[10px] text-blue-950 text-xm font-bold">
        {user.nickName}
      </p>

      {isFriend() && !isThisUser(user._id as string) && (
        <Link
          onClick={() => saveAvatar(index, user._id as string)}
          href="/users/[id]"
          as={`/users/${user.nickName}`}
          className="text-green-800 font-medium cursor-pointer hover:text-green-700"
        >
          Посмотреть добрые дела
        </Link>
      )}

      {!isFriend() && !isThisUser(user._id as string) && (
        <button
          type="button"
          onClick={() => addFriend(user._id as string)}
          className="btn-friend  bg-primary hover:bg-primary-600"
        >
          Добавить в друзья
        </button>
      )}

      {isFriend() && !isThisUser(user._id as string) && (
        <button
          type="button"
          onClick={() => openModalConfirm()}
          className="btn-friend bg-rose-500 hover:bg-rose-600"
        >
          Удалить из друзей
        </button>
      )}

      {isThisUser(user._id as string) && (
        <button
          type="button"
          onClick={() => router.push(USER)}
          className="btn-friend  bg-emerald-600 hover:bg-emerald-700"
        >
          Мои добрые дела
        </button>
      )}

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

export default OneUser;
