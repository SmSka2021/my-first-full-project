/* eslint-disable max-len */
export const BASE_URL = 'http://127.0.0.1:3001/';

export const urlAllUsers = '/user';
export const urlRegisterUser = '/user/register';
export const urlGetIdUser = '/profile';
export const urlGetUserByNick = '/user/nick'; // user/nick/:nickName
export const urlLoginUser = '/auth/login';
export const urAddFriend = '/user/friend';

// http://127.0.0.1:3001//user/:id/task  POST/with JWT- create one task user's + body{ title: string,  description: string;}

// http://127.0.0.1:3001//user/:idUser/task/:idTask  PUT- update one task user's +  body{ title: string,  description: string;}
// http://127.0.0.1:3001//user/:idUser/task/:idTask  DELETE/with JWT- delete one task user's

// http://127.0.0.1:3001//user/:idUser/friend/:idFriend  DELETE/with JWT- remove checked friend user's

// http://127.0.0.1:3001//user/:id
// GET/with JWT- one user by id ;
// PUT/with JWT- update one user by id + body: optional{ name: string, email: string, password: string, nickName: string} ;
// DELETE/with JWT- delete one user by id

// http://127.0.0.1:3001//user/nick/:nickName  // GET/with JWT- one user by nickname ;
