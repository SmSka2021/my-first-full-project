import { useDispatch } from 'react-redux';
import React from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../redux/hooks';
import { dataMessageSelector } from '../redux/selectors/user-selector';
import { AUTH } from '../utils/constants/path';
import {
  setIsShowMessage,
  setResetMessageUser,
} from '../redux/reducers/user-reducer';

function MessageUser() {
  const {
    action, btnTitle, textMessage, titleMessage, isErrorMessage,
  } = useAppSelector(dataMessageSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  const closeErrorMessage = () => {
    switch (action) {
      case 'auth':
        router.push(AUTH);
        break;
      default:
        break;
    }
    dispatch(setIsShowMessage({ isShowMessage: false }));
    dispatch(setResetMessageUser);
  };

  return (
    <div className="wrapper-mess">
      <div className="wrapper" />
      <div className="bg-white w-96 text-center relative rounded-md  px-12 pt-8 pb-5 flex flex-col items-center gap-3 text-blue-900 z-50 shadow">
        <button
          type="button"
          className="w-8 absolute right-5 top-4 h-8 rounded-full  hover:text-red-500 text-black hover:bg-slate-100 bg-slate-200"
          onClick={() => dispatch(setIsShowMessage({ isShowMessage: false }))}
        >
          X
        </button>
        <h3
          className={`text-xl font-bold leading-tight ${
            isErrorMessage ? 'text-red-600' : 'text-brand-darkblue'}`}
        >
          {titleMessage}
        </h3>
        <p className="text-brand-darkblue text-base">{textMessage}</p>
        {action !== 'notAction' && (
          <button type="button" className="btn btn-blue" onClick={closeErrorMessage}>{btnTitle}</button>
        )}
      </div>
    </div>
  );
}
export default MessageUser;
