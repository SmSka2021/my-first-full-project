/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { PayloadAction } from '@reduxjs/toolkit';
import eyeClosed from '../public/assets/svg/EyeClosed.svg';
import eyeOpen from '../public/assets/svg/Icon_Action.svg';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Func, UserRegistr } from '../interfaces/interfaces';
import { maxLength12, maxLength20, minLength5 } from '../utils/constants/const-breakpoint';
import { schemaAll } from '../utils/validation/all-field';
import { setIsShowAuth } from '../redux/reducers/user-reducer';
import { messageFormatName, messageFormatNick, messageFormatPassword } from '../utils/constants/message';
import fetchRegistrationUser from '../redux/thunks/registration-user';
import { oneUserSelector } from '../redux/selectors/user-selector';
import fetchUpdateUser from '../redux/thunks/update-user';
import { getIdUser } from '../utils/utilites/decoder-jwt';
import { useRouter } from 'next/router';
import { AUTH } from '../utils/constants/path';

function Registration(props: {type: 'update' | 'create', closeForm: Func}) {
  const [passwordInputType, setPasswordInputType] = useState('password');
  const { type, closeForm } = props;
  const user = useAppSelector(oneUserSelector);
  const dispatch = useDispatch();
  const dispatchApi = useAppDispatch();
  const router = useRouter();
  
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<UserRegistr>({
    resolver: yupResolver(schemaAll),
    mode: 'onChange',
    defaultValues: {
      name: type === 'update' ? user.name : '',
      nickName: type === 'update' ? user.nickName : '',
      email: type === 'update' ? user.email : '',
      password: type === 'update' ? user.password : '',
    },
  });

  const changeFormView = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    reset();
    dispatch(setIsShowAuth());
  };

  const changeTypesInputPassword = () => {
    if (passwordInputType !== 'password') {
      setPasswordInputType('password');
      return;
    }
    setPasswordInputType('text');
  };

  const onSubmit = async (data: UserRegistr) => {
    if (isDirty && isValid) {
      if (type === 'create') {
        const regResult: PayloadAction<any> = await dispatchApi(fetchRegistrationUser(data));
        if (regResult.payload && regResult.payload.status === 201) {
          reset();
          dispatch(setIsShowAuth());
        }
      } else {
        const item = { idUser: getIdUser(), user: data };
        const regResult: PayloadAction<any> = await dispatchApi(fetchUpdateUser(item));
        if (regResult.payload && regResult.payload.status === 200) {
          reset();
          closeForm();
        }
      }
    }
  };

  const isChangeProfile = () => {
    if (user.name) {
      return ((user.name !== getValues('name')) || (user.nickName !== getValues('nickName')) || (user.email !== getValues('email')) || (user.password !== getValues('password'))) && isValid;
    }
    return false;
  };

  return (
    <div className={`w-max relative ${ router.pathname !== AUTH && 'z-20'}`}>
      <div className="w-max relative">
        <h2 className="reg-head">{type === 'create' ? 'Регистрация' : 'Редактировать'}</h2>
        {type === 'update' && (
        <button
          type="button"
          className="absolute top-2.5 right-2.5 rounded-full border-2 border-white w-5 h-5 text-xs  text-white font-bold  hover:text-blue-200 hover:border-blue-200"
          onClick={() => closeForm()}
        >
          X
        </button>
        )}
      </div>
      <fieldset className="block p-5 bg-white border-2 border-solid outline-gray-700 shadow">
        <form className="relative flex-col flex justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Введите имя..."
            {...register('name')}
            required
            maxLength={maxLength20}
            minLength={minLength5}
            className={`input-form ${errors.name ? 'bg-[#FFEDD7]' : ''}`}
          />

          <input
            type="text"
            placeholder="Введите nickName"
            {...register('nickName')}
            required
            maxLength={maxLength12}
            minLength={minLength5}
            className={`input-form ${errors.nickName ? 'bg-[#FFEDD7]' : ''}`}
          />

          <input
            type="email"
            {...register('email')}
            placeholder="Ваш email..."
            required
            className={`input-form ${errors.email ? 'bg-[#FFEDD7]' : ''}`}
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

            <button type="button" className="absolute bottom-3 right-4 border-0 cursor-pointer" onClick={changeTypesInputPassword}>
              <img src={passwordInputType === 'password' ? eyeClosed.src : eyeOpen.src} alt="icon" />
            </button>
          </div>

          {errors.email && <p className="self-start text-xs text-red-600 ml-3">{errors.email.message}</p>}
          {errors.password && <p className="self-start text-xs text-red-600 ml-3">{messageFormatPassword}</p>}
          {errors.nickName && <p className="self-start text-xs text-red-600 ml-3">{messageFormatNick}</p>}
          {errors.name && <p className="self-start text-xs text-red-600 ml-3">{messageFormatName}</p>}

          <button disabled={type === 'create' ? !isValid : !isChangeProfile()} type="submit" className="btn btn-blue mt-3 w-64 mb-3">{type === 'create' ? 'Зарегистрироваться' : 'Сохранить'}</button>
        </form>

        {type === 'create' && (
        <button
          type="button"
          className="text-sky-900 border-none text-sm cursor-pointer hover:text-sky-700 ml-2 font-semibold"
          onClick={(e: React.MouseEvent<HTMLElement>) => changeFormView(e)}
        >
          Уже зарегистрированы? Войти.
        </button>
        )}
      </fieldset>
    </div>
  );
}

export default Registration;
