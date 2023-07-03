import * as yup from 'yup';
import { messageEmptyField, messageFormatName, messageFormatPassword } from '../constants/message';

const schemaAuth = yup.object().shape({
  name: yup.string().required(messageEmptyField).min(5, messageFormatName)
    .max(20, messageFormatName),
  password: yup.string().required(messageEmptyField).min(5, messageFormatPassword)
    .max(12, messageFormatPassword),
}).required();
export default schemaAuth;
