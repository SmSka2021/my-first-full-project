/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppSelector } from '../redux/hooks';
import {
  isAuthSelector,
  oneUserSelector,
} from '../redux/selectors/user-selector';
import { getLocalStorage } from '../utils/utilites/save-local-storage';
import {
  AUTH, USERS, MAIN, USER, PROFILE,
} from '../utils/constants/path';
import logo from '../public/assets/img/order_book.png';
import avatar from '../public/assets/avatars/avatar.png';
import {
  resetDataUser,
  setIsShowRegOrAuth,
} from '../redux/reducers/user-reducer';
import { isAuth, isJwt, isRightTokenTime } from '../utils/utilites/decoder-jwt';

export function Header() {
  const [isVisibleUserLink, setIsVisibleUserLink] = useState(false);
  const user = useAppSelector(oneUserSelector);
  const mockName = 'пользователь';
  const [name, setName] = useState('');

  useEffect(() => {
    setName(user.nickName || getLocalStorage('userNick') || mockName);
  }, [user.nickName]);

  const router = useRouter();
  const dispatch = useDispatch();

  const isAuthState = useAppSelector(isAuthSelector);
  const isAuthUser = isAuthState || isAuth();

  const changeVisibleUserLink = () => {
    setIsVisibleUserLink(!isVisibleUserLink);
  };

  const navigateAuth = (typeAuth: string): void => {
    if (typeAuth === 'reg') {
      dispatch(setIsShowRegOrAuth({ type: false }));
    } else {
      dispatch(setIsShowRegOrAuth({ type: true }));
    }
    router.push(AUTH);
  };

  const removeAuth = (action: string) => {
    if (action === 'closeModal') changeVisibleUserLink();
    localStorage.clear();
    dispatch(resetDataUser());
    router.push(AUTH);
  };

  const openProfilePage = () => {
    changeVisibleUserLink();
    router.push(PROFILE);
  };

  return (
    <header>
      <div className="flex justify-between px-10 py-3 items-center relative bg-blue-950">
        <button
          type="button"
          className="flex gap-3 text-xl text-white font-bold"
          onClick={() => router.push(MAIN)}
        >
          <img className="w-10 object-contain" src={logo.src} alt="logo" />
          Book of good deeds
        </button>
        {isAuthUser && (
          <div className="relative">
            <div
              className="flex justify-center items-center gap-5"
              onClick={changeVisibleUserLink}
            >
              {name && (
                <button
                  type="button"
                  className="btn-empty text-white font-bold"
                >
                  {`Привет, ${name}!`}
                </button>
              )}
              <button className="btn-empty text-white font-bold" type="button">
                {!isVisibleUserLink ? 'ᨆ' : 'ᨈ'}
              </button>
              <img
                className="w-10 rounded-full"
                src={avatar.src}
                alt="Avatar"
              />
            </div>

            {isVisibleUserLink && (
              <ul className="absolute top-14 shadow py-5 px-10 z-10 bg-gray-50">
                <li className="link mb-5" onClick={() => openProfilePage()}>
                  Мой профиль
                </li>
                <li className="link" onClick={() => removeAuth('closeModal')}>
                  Выход
                </li>
              </ul>
            )}
          </div>
        )}
        {!isAuthUser && (
          <div className="flex">
            <button
              className="btn btn-blue mr-5"
              onClick={() => navigateAuth('reg')}
              type="button"
            >
              Регистрация
            </button>
            <button
              className="btn btn-blue"
              onClick={() => navigateAuth('auth')}
              type="button"
            >
              Вход
            </button>
          </div>
        )}
      </div>
      {router.pathname !== AUTH && isJwt() && isRightTokenTime() && (
        <nav className="px-10 py-3 bg-blue-50 shadow-xl">
          <Link
            href={MAIN}
            className={`nav-link ${
              router.pathname === MAIN
                ? 'text-indigo-600'
                : 'text-brand-darkblue'
            }`}
          >
            Главная
          </Link>
          <Link
            href={USER}
            className={`nav-link mx-5 ${
              router.pathname === USER
                ? 'text-indigo-600'
                : 'text-brand-darkblue'
            }`}
          >
            {' '}
            Мои добрые дела
          </Link>
          <Link
            href={PROFILE}
            className={`nav-link mx-5 ${
              router.pathname === PROFILE
                ? 'text-indigo-600'
                : 'text-brand-darkblue'
            }`}
          >
            {' '}
            Мой профиль
          </Link>
          <Link
            href={USERS}
            className={`nav-link ${
              router.pathname === USERS
                ? 'text-indigo-600'
                : 'text-brand-darkblue'
            }`}
          >
            Все пользователи
          </Link>
        </nav>
      )}
    </header>
  );
}
export default Header;
