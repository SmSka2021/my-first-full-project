/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { PayloadAction } from '@reduxjs/toolkit';
import Layout from '../components/Layout';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  allUserSelector,
  oneUserSelector,
} from '../redux/selectors/user-selector';
import fetchGetOneUserById from '../redux/thunks/get-user-by-id';
import {
  getIdUser,
  isAuth,
  isRightTokenTime,
  isJwt,
} from '../utils/utilites/decoder-jwt';
import avatar from '../public/assets/avatars/avatar.png';
import { resetDataUser } from '../redux/reducers/user-reducer';
import { AUTH, MAIN } from '../utils/constants/path';
import fetchDeleteUser from '../redux/thunks/delete-user';
import {
  messageConfirmDel,
  textUser,
  titleUser,
} from '../utils/constants/message';
import fetchGetAllUsers from '../redux/thunks/get-all-users';
import filterFriends from '../utils/utilites/filter-friends';
import CardFriend from '../components/CardFriend';
import NotFound from '../components/NotFound';
import Registration from '../components/Registration';
import ModalConfirm from '../components/ModalConfirm';

function ProfilePage() {
  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const dispatchApi = useAppDispatch();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useAppSelector(oneUserSelector);
  const users = useAppSelector(allUserSelector);

  useEffect(() => {
    if (!isAuth()) {
      router.push(AUTH);
    }
  }, []);

  useEffect(() => {
    if (!user.name && isJwt() && isRightTokenTime()) {
      dispatchApi(fetchGetOneUserById(getIdUser()));
    }
  }, []);

  useEffect(() => {
    const fething = async () => {
      if (isJwt()) {
        await dispatchApi(fetchGetAllUsers());
      }
    };
    if (users.length === 0) fething();
  }, [users.length]);

  const openForm = () => {
    setIsShowEditForm(true);
  };

  const closeFormEdit = () => {
    setIsShowEditForm(false);
  };

  const removeAuth = () => {
    localStorage.clear();
    dispatch(resetDataUser());
    router.push(MAIN);
  };

  const deleteUser = async () => {
    setIsShowConfirmModal(false);
    const res: PayloadAction<any> = await dispatchApi(
      fetchDeleteUser(user._id || getIdUser()),
    );
    if (res.payload) {
      if (res.payload.status === 200) removeAuth();
    }
  };

  const closeModalConfirm = () => {
    setIsShowConfirmModal(false);
  };

  const openModalConfirm = () => {
    setIsShowConfirmModal(true);
  };

  return (
    <Layout title="Моя страничка">
      <main>
        <div className="flex py-10 flex-wrap w-full">
          <section className="px-10 w-1/4 flex-col flex justify-center items-center">
            <h4 className="text-2xl font-bold text-blue-900 text-center">
              Мой профиль
            </h4>
            <img
              className="w-20 rounded-full mx-auto my-5"
              src={avatar.src}
              alt="Avatar"
            />
            <div className="my-0 mx-auto">
              <p className="text-sm text-gray-900">
                Имя:
                <span className="text-base font-semibold text-blue-900">
                  {user?.name}
                </span>
              </p>
              <p className="text-sm text-gray-900">
                NickName:
                <span className="text-base font-semibold text-blue-900">
                  {user?.nickName}
                </span>
              </p>
              <p className="text-sm text-gray-900">
                Email:
                <span className="text-base font-semibold text-blue-900">
                  {user?.email}
                </span>
              </p>
              <div className="flex flex-col gap-2 my-4 items-start">
                <button
                  type="button"
                  className="cursor-pointer text-green-900 text-sm hover:text-blue-700 border-none"
                  onClick={() => openForm()}
                >
                  <span>&#9998; </span>
                  <span> Редактировать</span>
                </button>
                <button
                  type="button"
                  className="cursor-pointer text-green-900 text-sm hover:text-blue-700 border-none"
                  onClick={() => removeAuth()}
                >
                  <span className="text-blue-800">&#8854; </span>
                  <span> Выйти из профиля</span>
                </button>
                <button
                  type="button"
                  className="cursor-pointer text-green-900 text-sm hover:text-blue-700 border-none"
                  onClick={() => openModalConfirm()}
                >
                  <span className="text-red-700">&#8855; </span>
                  <span> Удалить профиль</span>
                </button>
              </div>
            </div>
            {isShowEditForm && (
              <div className="wrapper-mess">
                <div className="wrapper" />
                <Registration type="update" closeForm={closeFormEdit} />
              </div>
            )}

            {isShowConfirmModal && (
              <div className="wrapper-mess">
                <div className="wrapper" />
                <ModalConfirm
                  text={messageConfirmDel}
                  closeForm={closeModalConfirm}
                  confirmDel={deleteUser}
                />
              </div>
            )}
          </section>
          <section className="px-10 w-3/4">
            <h4 className="text-2xl font-bold text-blue-900 text-center">
              Мои друзья
            </h4>

            { user && user.friends.length === 0 && (
              <NotFound title={titleUser} text={textUser} />
            )}
            { user && user.friends.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 py-4">
                {filterFriends(users).map((friend) => (
                  <div key={friend.nickName}>
                    <CardFriend friend={friend} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
}
export default ProfilePage;
