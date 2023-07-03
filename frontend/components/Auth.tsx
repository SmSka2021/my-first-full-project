/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../redux/hooks';
import { UserAuth } from '../interfaces/interfaces';
import schemaAuth from '../utils/validation/shema-auth';
import { getIdUser, isJwt } from '../utils/utilites/decoder-jwt';
import {
  maxLength12,
  maxLength20,
  minLength5,
} from '../utils/constants/const-breakpoint';
import { setIsShowAuth } from '../redux/reducers/user-reducer';
import fetchAuthorizeUser from '../redux/thunks/auth-user';
import { USER } from '../utils/constants/path';
import fetchGetOneUserById from '../redux/thunks/get-user-by-id';
import eyeClosed from '../public/assets/svg/EyeClosed.svg';
import eyeOpen from '../public/assets/svg/Icon_Action.svg';

function Auth() {
  const [passwordInputType, setPasswordInputType] = useState('password');
  const router = useRouter();
  const dispatch = useDispatch();
  const dispatchApi = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<UserAuth>({
    resolver: yupResolver(schemaAuth),
    mode: 'onChange',
  });

  const changeFormView = () => {
    dispatch(setIsShowAuth());
  };

  const changeTypesInputPassword = () => {
    if (passwordInputType !== 'password') {
      setPasswordInputType('password');
      return;
    }
    setPasswordInputType('text');
  };

  const onSubmit = async (data: UserAuth) => {
    if (isDirty && isValid) {
      const authResult: PayloadAction<any> = await dispatchApi(
        fetchAuthorizeUser(data),
      );
      if (authResult.payload) {
        if (authResult.payload.status === 201 && isJwt()) {
          await dispatchApi(fetchGetOneUserById(getIdUser()));
          reset();
          router.push(USER);
        }
      }
    }
  };

  return (
    <div className="form_login">
      <h2 className="reg-head">Авторизация</h2>
      <fieldset className="block p-5 bg-white border-2 border-solid outline-gray-700 shadow">
        <form
          className="relative flex-col flex justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Введите имя..."
            {...register('name')}
            required
            maxLength={maxLength20}
            minLength={minLength5}
            className={`input-form ${errors.name ? 'bg-[#FFEDD7]' : ''}`}
          />
          <div className="relative">
            <input
              type={passwordInputType}
              {...register('password')}
              placeholder="Ваш сложный пароль..."
              required
              maxLength={maxLength12}
              minLength={minLength5}
              className={`input-form ${errors.password ? 'bg-[#FFEDD7]' : ''}`}
            />

            <button
              type="button"
              className="absolute bottom-3 right-4 border-0 cursor-pointer"
              onClick={changeTypesInputPassword}
            >
              <img
                src={
                  passwordInputType === 'password' ? eyeClosed.src : eyeOpen.src
                }
                alt="icon"
              />
            </button>
          </div>

          {errors.password && (
            <p className="self-start text-xs text-red-600 ml-3">
              {errors?.password?.message}
            </p>
          )}
          {errors.name && (
            <p className="self-start text-xs text-red-600 ml-3">
              {errors?.name?.message}
            </p>
          )}

          <button
            disabled={!isValid}
            type="submit"
            className="btn btn-blue mt-3 w-64 mb-3"
          >
            Войти
          </button>
        </form>
        <button
          type="button"
          className="text-sky-900 text-sm cursor-pointer hover:text-sky-700 ml-2 border-none font-semibold"
          onClick={() => changeFormView()}
        >
          Нет аккаунта? Регистрация.
        </button>
      </fieldset>
    </div>
  );
}
export default Auth;
