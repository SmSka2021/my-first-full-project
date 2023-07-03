import axios from 'axios';
import {
  BASE_URL, urAddFriend, urlAllUsers, urlGetUserByNick, urlLoginUser, urlRegisterUser,
} from '../utils/constants/url';
import { jwtUser } from '../utils/utilites/decoder-jwt';
import { UserRegistr, UserAuth, Todo } from '../interfaces/interfaces';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const instanceJwt = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instanceJwt.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `Bearer ${jwtUser()}`;
    return request;
  },
  (error) => {
    console.log(error, 'No token');
  },
);

const userAPI = {
  registerUser(data: UserRegistr) {
    return instance.post(urlRegisterUser, data);
  },
  authUser(data: UserAuth) {
    return instance.post(urlLoginUser, data);
  },
  getAllUsers() {
    return instance.get(urlAllUsers);
  },
  getOneUserById(idUser: string) {
    return instanceJwt.get(`${urlAllUsers}/${idUser}`);
  },
  getOneUserByNick(nick: string) {
    return instanceJwt.get(`${urlGetUserByNick}/${nick}`);
  },
  updateUser(idUser: string, data:UserRegistr) {
    return instanceJwt.put(`${urlAllUsers}/${idUser}`, data);
  },
  removeUser(idUser: string) {
    return instanceJwt.delete(`${urlAllUsers}/${idUser}`);
  },
  addTodoUser(idUser: string, data: Todo) {
    return instanceJwt.post(`${urlAllUsers}/${idUser}/task`, data);
  },
  daleteTodoUser(idUser: string, idTodo: string) {
    return instanceJwt.delete(`${urlAllUsers}/${idUser}/task/${idTodo}`);
  },
  updateTodoUser(idUser: string, idTodo: string, data: Todo) {
    return instanceJwt.put(`${urlAllUsers}/${idUser}/task/${idTodo}`, data);
  },
  addFriend(data: {idUser: string, idFriend: string}) {
    return instanceJwt.post(urAddFriend, data);
  },
  deleteFriend(idUser: string, idFriend: string) {
    return instanceJwt.delete(`${urlAllUsers}/${idUser}/friend/${idFriend}`);
  },
};
export default userAPI;
