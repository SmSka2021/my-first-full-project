import { MessageUser } from '../../interfaces/interfaces';

export const emptyMessage: MessageUser = {
  titleMessage: '',
  textMessage: '',
  action: '',
  btnTitle: '',
  isErrorMessage: false,
};

export const messageBack: MessageUser = {
  titleMessage: 'Данные не сохранились',
  textMessage: 'Такой логин (телефон, пароль или e-mail) уже записан в системе. Попробуйте зарегистрироваться с другими данными',
  action: 'back',
  btnTitle: 'назад к регистрации',
  isErrorMessage: true,
};

export const messageEmptyUsers: MessageUser = {
  titleMessage: 'Данных нет',
  textMessage: 'Извините, в нашей базе пока нет пользователей',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: true,
};

export const messageErr: MessageUser = {
  titleMessage: 'Данных нет',
  textMessage: 'Извините, произошла ошибка. Попробуйте позже',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: true,
};

export const messageErrReg: MessageUser = {
  titleMessage: 'Регистрация не выполнена',
  textMessage: 'Извините, произошла ошибка. Попробуйте позже',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: true,
};

export const messageErrNotUnicData: MessageUser = {
  titleMessage: 'Регистрация не выполнена',
  textMessage: 'Пользователь с такими данными уже существует, введите другие данные для регистрации',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: true,
};

export const messageErrNotUnicDataUpd: MessageUser = {
  titleMessage: 'Обновление не выполнено',
  textMessage: 'Пользователь с такими данными уже существует, введите другие данные.',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: true,
};

export const messageSuccessReg: MessageUser = {
  titleMessage: 'Регистрация выполнена успешно',
  textMessage: 'Пользователь зарегистрирован, пожалуйста, зайдите на сайт, используя имя и пароль',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: false,
};

export const messageErrAuthNotData: MessageUser = {
  titleMessage: ' Вход  не выполнен',
  textMessage: 'Пользователь с такими данными не найден',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: true,
};
export const messageErrTimeJwt: MessageUser = {
  titleMessage: ' Вход  не выполнен',
  textMessage: 'Время сессии истекло. Пожалуйста, зайдите в приложение, используя логин и пароль',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: true,
};
export const messageSuccess: MessageUser = {
  titleMessage: 'Данные обновлены',
  textMessage: 'Ваши данные успешно обновлены',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: false,
};
export const messageSuccessDelUser: MessageUser = {
  titleMessage: 'Данные удалены',
  textMessage: 'Данные о пользователе полностью удалены из системы. Очень жаль, что Вы с нами расстались :(',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: false,
};

export const messageSuccessAddTodo: MessageUser = {
  titleMessage: 'Поздравляем!',
  textMessage: 'Новое доброе дело успешно добавлено.',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: false,
};

export const messageSuccessUpdTodo: MessageUser = {
  titleMessage: 'Данные обновлены',
  textMessage: 'Ваше доброе дело успешно обновлено',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: false,
};

export const messageSuccessAddUser: MessageUser = {
  titleMessage: 'Поздравляем!',
  textMessage: 'У Вас появился новый друг!',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: false,
};
export const messageSuccessDeleteUser: MessageUser = {
  titleMessage: 'Удаление прошло успешно!',
  textMessage: 'Только что Bы успешно потеряли друга :(',
  action: 'closeModal',
  btnTitle: 'Ok',
  isErrorMessage: false,
};
