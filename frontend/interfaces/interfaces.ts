/* eslint-disable no-unused-vars */
export interface TodoInterface {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface UserFull {
  _id?: string;
  name: string;
  email: string;
  password: string;
  nickName: string;
  tasks: TodoInterface[];
  friends: string[];
}

export interface UserRegistr {
  name: string;
  email: string;
  password: string;
  nickName: string;
}

export interface UserAuth {
  name: string;
  password: string;
}

export interface MessageUser {
  titleMessage: string,
  textMessage: string,
  action: string,
  btnTitle: string,
  isErrorMessage: boolean,
}

export type Func = () => void;
export type FuncData = (data: string) => void;
export interface Todo {
  title: string;
  description: string;
}
