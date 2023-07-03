import * as yup from 'yup';
import {
  messageEmptyField, messageErrDesMax, messageErrDesMin, messageErrTitleMax,
  messageErrTitleMin,
} from '../constants/message';

export const schemaTodo = yup.object().shape({
  title: yup.string().required(messageEmptyField).min(5, messageErrTitleMin)
    .max(50, messageErrTitleMax),
  description: yup.string().required(messageEmptyField).min(5, messageErrDesMin)
    .max(300, messageErrDesMax),
}).required();

export default schemaTodo;
