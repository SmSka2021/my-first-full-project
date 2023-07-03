/* eslint-disable no-unused-expressions */
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import emailIcon from '../public/assets/img/email.png';
import { isValidEmail } from '../utils/validation/all-field';
import {
  SERVICE_ID,
  TEMPLATE_ID,
  MY_ID_EMAILJS,
} from '../utils/constants/form-contact-data';

function FormContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rejected, setRejected] = useState(false);

  const reset = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const onSubmit = async () => {
    if (name && email && message) {
      const templateParams = {
        from_name: name,
        from_email: email,
        message,
      };

      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, templateParams, MY_ID_EMAILJS)
        .then(() => {
          setSuccess(true);
          setRejected(false);
        })
        .catch((err) => {
          setSuccess(false);
          setRejected(true);
          console.log('FAILED...', err);
        });
      reset();
    }
  };

  if (success) {
    return (
      <div className="min-w-[30%] max-w-[70%] flex flex-col items-center  justify-center  text-center gap-[30px]">
        <h1 className="mt-[50px] cursive  text-xl text-blue-100">
          Ваше сообщение успешно отправлено.
          <br />
          Спасибо, что нашли время для связи с нами.
        </h1>
        <img
          className="max-w-[150px]  mb-[30px]"
          src={emailIcon.src}
          alt="icon"
        />
        <button
          type="button"
          onClick={() => {
            setSuccess(false);
            setRejected(false);
          }}
          className="btn btn-blue"
        >
          Отправить ещё одно сообщение
        </button>
      </div>
    );
  }
  if (rejected) {
    return (
      <div className="min-w-[40%] flex flex-col items-center  justify-center  text-center gap-[30px]">
        <h1 className="mt-[50px] cursive  text-xl text-blue-100">
          Что-то пошло не так. Ваше сообщение не отправлено.
        </h1>
        <button
          type="button"
          onClick={() => {
            setSuccess(false);
            setRejected(false);
          }}
          className="btn btn-blue"
        >
          Повторить
        </button>
      </div>
    );
  } if (!rejected && !success) {
    return (
      <form className="min-w-[50%] block mt-[50px]">
        <h3 className=" text-center text-2xl text-white text-bold w-[90%]">
          Связаться с автором проекта
        </h3>
        <div className="relative  w-[80%]   my-0 mx-auto">
          <label htmlFor="formName" className="block">
            <input
              type="text"
              id="formName"
              className="form_control"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="relative  w-[80%]   my-0 mx-auto">
          <label htmlFor="formEmail" className="block">
            <input
              type="email"
              id="formEmail"
              className="form_control"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                isValidEmail(e.target.value)
                  ? setIsErrorEmail(false)
                  : setIsErrorEmail(true);
              }}
              required
            />
          </label>
          {isErrorEmail && (
            <p className="text-sm text-red-200  ml-[20px] text-medium">
              Некорректный email
            </p>
          )}
        </div>

        <div className="relative  w-[80%]   my-0 mx-auto">
          <textarea
            id="formMessage"
            className="h-[120px] pt-3 resize-none w-[90%] bg-[#f2f6f8]  rounded-xl  border-none shadow   py-[0.5px] px-[35px] text-[#212529] text-sm my-[15px] mx-auto"
            rows={7}
            placeholder="Текст сообщения"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="relative  w-[80%]   my-0 mx-auto">
          <button
            type="button"
            onClick={() => {
              onSubmit();
            }}
            className="btn btn-blue"
            tabIndex={-1}
            disabled={!name || !email || !message}
          >
            Отправить сообщение
          </button>
        </div>
      </form>
    );
  }
}
export default FormContact;
