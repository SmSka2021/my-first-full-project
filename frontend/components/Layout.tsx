/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Header } from './Header';
import MessageUser from './MessageUser';
import { useAppSelector } from '../redux/hooks';
import {
  isAuthSelector,
  isShowLoaderSelector,
  isShowMessageSelector,
} from '../redux/selectors/user-selector';
import Loader from './Loader';
import { isAuth, isJwt, isRightTokenTime } from '../utils/utilites/decoder-jwt';
import {
  setMessageUser,
  setIsShowMessage,
  resetDataUser,
} from '../redux/reducers/user-reducer';
import { messageErrTimeJwt } from '../utils/constants/message-user';
import Footer from './Footer';

type Props = {
  children: ReactNode;
  title: string;
};

function Layout({ children, title = 'This is the default title' }: Props) {
  const isShowMessage = useAppSelector(isShowMessageSelector);
  const isShowLoader = useAppSelector(isShowLoaderSelector);

  const isAuthState = useAppSelector(isAuthSelector);
  const dispatch = useDispatch();

  const isAuthUser = isAuthState || isAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthUser) {
      if (isJwt() && !isRightTokenTime()) {
        dispatch(setMessageUser({ messageUser: messageErrTimeJwt }));
        dispatch(setIsShowMessage({ isShowMessage: true }));
        dispatch(resetDataUser());
        localStorage.clear(); 
      }
    }
  }, [isAuthUser]);

  return (
    <>
      <Header />
      {children}
      {isShowMessage && <MessageUser />}
      {isShowLoader && <Loader />}
      <Footer />
    </>
  );
}

export default Layout;
