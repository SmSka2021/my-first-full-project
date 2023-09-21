/* eslint-disable global-require */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { getLocalStorage } from './save-local-storage';

export const jwtDecode = (token: string) => {
  if (!token) return;
  // return  {username: 'qwe', sub: '649be4fb88af90f1725d3b8b', iat: 1687948090, exp: 1687991290}
  if (typeof window !== 'undefined') {
    window.Buffer = window.Buffer || require('buffer').Buffer;
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }
};

export const isJwt = (): boolean => typeof localStorage.getItem('jwt') === 'string';
export const isAuth = (): boolean | null => getLocalStorage('auth');

export const jwtUser = () => {
  if (isJwt()) return getLocalStorage('jwt').access_token;
  return null;
};

export const isRightTokenTime = () => {
  if (isJwt()) {
    const timeTokenLocal = jwtDecode(jwtUser()).exp;
    return timeTokenLocal * 1000 > new Date().getTime();
  }
};

export const getIdUser = () => {
  if (isJwt()) {
    return jwtDecode(jwtUser()).sub;
  }
};
