/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PayloadAction } from '@reduxjs/toolkit';
import Layout from '../components/Layout';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { oneUserSelector } from '../redux/selectors/user-selector';
import fetchGetOneUserById from '../redux/thunks/get-user-by-id';
import {
  getIdUser, isAuth, isRightTokenTime, isJwt,
} from '../utils/utilites/decoder-jwt';
import CardTodo from '../components/CardTodo';
import {
  messageConfirmDelTodo, titleTodo, textUser,
} from '../utils/constants/message';
import fetchDeleteTodo from '../redux/thunks/delete-todo';
import { FormUpdTodo } from '../components/FormUpdTodo';
import NotFound from '../components/NotFound';
import { MAIN } from '../utils/constants/path';
import FormAddTodo from '../components/FormAddTodo';
import ModalConfirm from '../components/ModalConfirm';

function UserPage() {
  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [isCheckedTodo, setIdCheskedTodo] = useState('');
  const dispatchApi = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(oneUserSelector);

  useEffect(() => {
    if (!isAuth()) {
      router.push(MAIN);
    }
  }, []);

  useEffect(() => {
    const fething = async () => {
      if (isJwt() && isRightTokenTime()) {
        dispatchApi(fetchGetOneUserById(getIdUser()));
      }
    };
    fething();
  }, []);

  const openForm = () => {
    setIsShowEditForm(true);
  };

  const closeFormEdit = () => {
    setIsShowEditForm(false);
  };

  const deleteTodo = async () => {
    setIsShowConfirmModal(false);
    const item = { idUser: getIdUser(), idTodo: isCheckedTodo };
    const res:PayloadAction<any> = await dispatchApi(fetchDeleteTodo(item));
    if (res.payload) {
      if (res.payload.status === 200) await dispatchApi(fetchGetOneUserById(getIdUser()));
    }
  };

  const closeModalConfirm = () => {
    setIsShowConfirmModal(false);
  };

  const openModalConfirm = (idTodo: string) => {
    setIdCheskedTodo(idTodo);
    setIsShowConfirmModal(true);
  };

  const editTodoUser = (idTodo: string) => {
    setIdCheskedTodo(idTodo);
    openForm();
  };

  return (
    <Layout title="Моя страничка">
      <main className="pt-[10px]">
        <h4 className="text-xl font-bold text-blue-900 text-center my-[10px]"> Мои добрые дела</h4>
        <section className="px-10 w-full">
          <FormAddTodo />
        </section>
        <section className="px-10 w-full flex flex-wrap gap-[15px] items-stretch justify-evenly py-[15px]">
          {user.tasks.length === 0 && <NotFound title={titleTodo} text={textUser} />}
          {user.tasks.length > 0
            && user.tasks.map((task) => (
              <div key={task._id}>
                <CardTodo editTodo={editTodoUser} openConfirmModal={openModalConfirm} todo={task} />
              </div>
            ))}
        </section>

        {isShowConfirmModal && (
        <div className="wrapper-mess">
          <div className="wrapper" />
          <ModalConfirm text={messageConfirmDelTodo} closeForm={closeModalConfirm} confirmDel={deleteTodo} />
        </div>
        )}
        {isShowEditForm && isCheckedTodo && (
        <div className="wrapper-mess">
          <div className="wrapper" />
          <FormUpdTodo idTodo={isCheckedTodo} closeForm={closeFormEdit} />
        </div>
        )}
      </main>
    </Layout>
  );
}
export default UserPage;
