import React from 'react';
import { Func } from '../interfaces/interfaces';

function ModalConfirm(props: {
  text: string;
  closeForm: Func;
  confirmDel: Func;
}) {
  const { text, closeForm, confirmDel } = props;
  return (
    <div className="bg-white w-96 text-center relative rounded-md  px-12 pt-8 pb-5 flex flex-col items-center  gap-3 text-blue-900  z-50 shadow">
      <button
        type="button"
        className="w-8 absolute right-5 top-4 h-8 rounded-full  hover:text-red-500 text-black hover:bg-slate-100 bg-slate-200"
        onClick={() => closeForm()}
      >
        X
      </button>
      <h3 className={'text-xl font-bold leading-tight text-brand-darkblue\'}'}>
        Вы уверены?
      </h3>
      <p className="text-brand-darkblue text-base">{text}</p>
      <div className="flex justify-between w-full">
        <button
          type="button"
          className="btn btn-blue"
          onClick={() => closeForm()}
        >
          Отменить
        </button>
        <button
          type="button"
          className="btn bg-red-200 text-blue-950 hover:bg-red-300"
          onClick={() => confirmDel()}
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
}
export default ModalConfirm;
