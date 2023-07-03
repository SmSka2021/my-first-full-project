import { RootState } from '../store';

export const oneUserSelector = (state: RootState) => state.userState.userData;
export const allUserSelector = (state: RootState) => state.userState.users;
export const dataMessageSelector = (state: RootState) => state.userState.messageUser;
export const isAuthSelector = (state: RootState) => state.userState.isAuth;
export const isShowMessageSelector = (state: RootState) => state.userState.isShowMessage;
export const isShowAuthSelector = (state: RootState) => state.userState.isShowAuth;
export const isShowLoaderSelector = (state: RootState) => state.userState.isShowLoader;
export const todoSelector = (state: RootState) => state.userState.checkedTodo;
export const friendSelector = (state: RootState) => state.userState.friendData;
