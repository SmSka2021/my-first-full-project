/* eslint-disable prefer-regex-literals */
import * as yup from 'yup';
import {
  messageEmptyField, messageFormatPassword, messageFormatName, messageFormatNick,
} from '../constants/message';

export const patternEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i);

export const schemaAll = yup.object().shape({
  name: yup.string().required(messageEmptyField).min(5, messageFormatName)
    .max(20, messageFormatName),
  password: yup.string().required(messageEmptyField).min(5, messageFormatPassword)
    .max(12, messageFormatPassword),
  nickName: yup.string().required(messageEmptyField).min(5, messageFormatNick)
    .max(15, messageFormatName),
  email:
     yup.string()
       .required(messageEmptyField)
       .test({
         name: 'emailError',
         message: 'Введите корректный e-mail',
         test() {
           const { email } = this.parent;
           return patternEmail.test(email);
         },
       }),
}).required();

export const isValidEmail = (email:string) => patternEmail.test(email);
