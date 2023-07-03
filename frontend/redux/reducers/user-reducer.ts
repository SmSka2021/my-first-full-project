/* eslint-disable max-len */
/* eslint-disable arrow-parens */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { MessageUser, TodoInterface, UserFull } from '../../interfaces/interfaces';
import {
  emptyMessage, messageErr, messageErrReg, messageErrNotUnicData, messageSuccessReg, messageErrAuthNotData, messageSuccess, messageErrNotUnicDataUpd, messageSuccessDelUser, messageSuccessAddTodo, messageSuccessUpdTodo, messageSuccessAddUser, messageSuccessDeleteUser,
} from '../../utils/constants/message-user';
import fetchGetAllUsers from '../thunks/get-all-users';
import fetchRegistrationUser from '../thunks/registration-user';
import { saveLocalStorage } from '../../utils/utilites/save-local-storage';
import fetchAuthorizeUser from '../thunks/auth-user';
import fetchGetOneUserById from '../thunks/get-user-by-id';
import fetchUpdateUser from '../thunks/update-user';
import fetchDeleteUser from '../thunks/delete-user';
import fetchAddTodo from '../thunks/add-todo';
import fetchUpdateTodo from '../thunks/update-todo';
import { emptyTodo, emptyUser } from '../../utils/constants/empty-user';
import fetchGetUserByNick from '../thunks/get-user-by-nick';
import fetchDeleteFriend from '../thunks/delete-friend';
import fetchAddFriend from '../thunks/add-friend';

export type UsersState = {
  users: UserFull[];
  userData: UserFull,
  friendData: UserFull,
  isShowAuth: boolean,
  isShowMessage: boolean,
  isAuth: boolean,
  isErrorAuth: boolean,
  isShowLoader: boolean,
  jwt: string,
  messageUser: MessageUser,
  checkedTodo: TodoInterface
};

const initialState: UsersState = {
  checkedTodo: emptyTodo,
  users: [],
  userData: emptyUser,
  friendData: emptyUser,
  isShowAuth: false,
  isShowMessage: false,
  isAuth: false,
  isErrorAuth: false,
  isShowLoader: false,
  jwt: '',
  messageUser: {
    titleMessage: '',
    textMessage: '',
    action: '',
    btnTitle: '',
    isErrorMessage: false,
  },
};

export const usersSlice = createSlice({
  name: 'userData',
  initialState,

  reducers: {
    setCheckedTodo: (state: UsersState, action) => {
      state.checkedTodo = action.payload.todo;
    },
    setIsAuthUser: (state: UsersState, action) => {
      state.isAuth = action.payload.data;
    },
    setUserData: (state: UsersState, action) => {
      state.userData = action.payload.userData;
    },
    setUsers: (state: UsersState, { payload }) => {
      state.users = [...payload.allUsers];
    },
    setShowLoader: (state: UsersState, action) => {
      state.isShowLoader = action.payload.isShowLoader;
    },
    setIsShowMessage: (state: UsersState, action) => {
      state.isShowMessage = action.payload.isShowMessage;
    },
    setMessageUser: (state: UsersState, action) => {
      state.messageUser.titleMessage = action.payload.messageUser.titleMessage;
      state.messageUser.textMessage = action.payload.messageUser.textMessage;
      state.messageUser.action = action.payload.messageUser.action;
      state.messageUser.btnTitle = action.payload.messageUser.btnTitle;
      state.messageUser.isErrorMessage = action.payload.messageUser.isErrorMessage;
    },
    setResetMessageUser: (state: UsersState) => {
      state.messageUser = emptyMessage;
    },
    resetDataUser: (state: UsersState) => {
      state.userData = emptyUser;
      state.isAuth = false;
      localStorage.clear();
    },
    setIsShowAuth: (state: UsersState) => {
      state.isShowAuth = !state.isShowAuth;
    },
    setIsShowRegOrAuth: (state: UsersState, action) => {
      state.isShowAuth = action.payload.type;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchGetAllUsers.pending, (state: UsersState) => {
      state.isShowLoader = true;
    });
    builder.addCase(fetchGetAllUsers.fulfilled, (state: UsersState, { payload }) => {
      state.isShowLoader = false;
      if (payload?.status === 200) {
        state.users = [...payload.data];
      }
    });
    builder.addCase(fetchGetAllUsers.rejected, (state: UsersState) => {
      state.messageUser = messageErrReg;
      state.isShowLoader = false;
      state.isShowMessage = true;
    });
    /// //////////////////////////////////
    builder.addCase(fetchRegistrationUser.pending, (state: UsersState) => {
      state.isShowLoader = true;
      state.messageUser = emptyMessage;
    });
    builder.addCase(fetchRegistrationUser.fulfilled, (state: UsersState, { payload }) => {
      state.isShowLoader = false;
      if (payload?.status === 201) {
        state.userData = payload.data;
        saveLocalStorage('userNick', payload.data.name);
        state.messageUser = messageSuccessReg;
        state.isShowMessage = true;
      }
    });
    builder.addCase(fetchRegistrationUser.rejected, (state: UsersState, action) => {
      if (action.payload === 400) {
        state.messageUser = messageErrNotUnicData;
      } else {
        state.messageUser = messageErr;
      }
      state.isShowLoader = false;
      state.isShowMessage = true;
    });
    /// ///////////////////////////////
    builder.addCase(fetchAuthorizeUser.pending, (state: UsersState) => {
      state.isShowLoader = true;
      state.messageUser = emptyMessage;
    });
    builder.addCase(fetchAuthorizeUser.fulfilled, (state: UsersState, { payload }) => {
      if (payload?.status === 201) {
        state.jwt = payload.data;
        state.isAuth = true;
        saveLocalStorage('jwt', payload.data);
        saveLocalStorage('auth', true);
      }
      state.isShowLoader = false;
    });
    builder.addCase(fetchAuthorizeUser.rejected, (state: UsersState, action) => {
      if (action.payload === 401) {
        state.messageUser = messageErrAuthNotData;
      } else {
        state.messageUser = messageErr;
      }
      state.isShowLoader = false;
      state.isShowMessage = true;
    });
    /// ////////////////////////////
    builder.addCase(fetchGetOneUserById.pending, (state: UsersState) => {
      state.isShowLoader = true;
    });
    builder.addCase(fetchGetOneUserById.fulfilled, (state: UsersState, { payload }) => {
      if (payload?.status === 200) {
        state.userData = payload.data;
        saveLocalStorage('userNick', payload.data.name);
      }
      state.isShowLoader = false;
    });
    builder.addCase(fetchGetOneUserById.rejected, (state: UsersState) => {
      state.messageUser = messageErr;
      state.isShowLoader = false;
      state.isShowMessage = true;
    });
    /// //////////////////////
    builder.addCase(fetchUpdateUser.pending, (state: UsersState) => {
      state.isShowLoader = true;
      state.messageUser = emptyMessage;
    });
    builder.addCase(fetchUpdateUser.fulfilled, (state: UsersState, { payload }) => {
      if (payload?.status === 200) {
        state.userData = payload.data;
        saveLocalStorage('userNick', payload.data.name);
        state.messageUser = messageSuccess;
        state.isShowMessage = true;
      }
      state.isShowLoader = false;
    });
    builder.addCase(fetchUpdateUser.rejected, (state: UsersState, action) => {
      if (action.payload === 400) {
        state.messageUser = messageErrNotUnicDataUpd;
      } else {
        state.messageUser = messageErr;
      }
      state.isShowLoader = false;
      state.isShowMessage = true;
    });
    /// ///////////////////
    builder.addCase(fetchDeleteUser.pending, (state: UsersState) => {
      state.isShowLoader = true;
      state.messageUser = emptyMessage;
    });
    builder.addCase(fetchDeleteUser.fulfilled, (state: UsersState, { payload }) => {
      if (payload?.status === 200) {
        state.messageUser = messageSuccessDelUser;
        state.isShowMessage = true;
      }
      state.isShowLoader = false;
    });
    builder.addCase(fetchDeleteUser.rejected, (state: UsersState) => {
      state.messageUser = messageErr;
      state.isShowLoader = false;
      state.isShowMessage = true;
    });
    /// /////////////////////
    builder.addCase(fetchAddTodo.pending, (state: UsersState) => {
      state.isShowLoader = true;
      state.messageUser = emptyMessage;
    });
    builder.addCase(fetchAddTodo.fulfilled, (state: UsersState, { payload }) => {
      if (payload?.status === 201) {
        state.userData = payload.data;
        state.messageUser = messageSuccessAddTodo;
        state.isShowMessage = true;
      }
      state.isShowLoader = false;
    });
    builder.addCase(fetchAddTodo.rejected, (state: UsersState) => {
      state.messageUser = messageErr;
      state.isShowLoader = false;
      state.isShowMessage = true;
    });
    /// ///////////////////////
    builder.addCase(fetchUpdateTodo.pending, (state: UsersState) => {
      state.isShowLoader = true;
      state.messageUser = emptyMessage;
    });
    builder.addCase(fetchUpdateTodo.fulfilled, (state: UsersState, { payload }) => {
      if (payload?.status === 200) {
        state.userData = payload.data;
        state.messageUser = messageSuccessUpdTodo;
        state.isShowMessage = true;
      }
      state.isShowLoader = false;
    });
    builder.addCase(fetchUpdateTodo.rejected, (state: UsersState) => {
      state.messageUser = messageErr;
      state.isShowLoader = false;
      state.isShowMessage = true;
    });
    /// ///////////////////////
    builder.addCase(fetchAddFriend.pending, (state: UsersState) => {
      state.isShowLoader = true;
      state.messageUser = emptyMessage;
    });
    builder.addCase(fetchAddFriend.fulfilled, (state: UsersState, { payload }) => {
      if (payload?.status === (201 || 200)) {
        state.userData = payload.data;
        state.messageUser = messageSuccessAddUser;
        state.isShowMessage = true;
      }
      state.isShowLoader = false;
    });
    builder.addCase(fetchAddFriend.rejected, (state: UsersState) => {
      state.messageUser = messageErr;
      state.isShowLoader = false;
      state.isShowMessage = true;
    });

    /// ///////////////////////
    builder.addCase(fetchGetUserByNick.pending, (state: UsersState) => {
      state.isShowLoader = true;
      state.messageUser = emptyMessage;
    });
    builder.addCase(fetchGetUserByNick.fulfilled, (state: UsersState, { payload }) => {
      if (payload?.status === 200) {
        state.friendData = payload.data;
      }
      state.isShowLoader = false;
    });
    builder.addCase(fetchGetUserByNick.rejected, (state: UsersState) => {
      state.messageUser = messageErr;
      state.isShowLoader = false;
      state.isShowMessage = true;
    });
    /// ///////////////////////
    builder.addCase(fetchDeleteFriend.pending, (state: UsersState) => {
      state.isShowLoader = true;
      state.messageUser = emptyMessage;
    });
    builder.addCase(fetchDeleteFriend.fulfilled, (state: UsersState, { payload }) => {
      if (payload?.status === 200) {
        state.userData = payload.data;
        state.messageUser = messageSuccessDeleteUser;
        state.isShowMessage = true;
        state.isShowLoader = false;
      }
    });
    builder.addCase(fetchDeleteFriend.rejected, (state: UsersState) => {
      state.messageUser = messageErr;
      state.isShowLoader = false;
      state.isShowMessage = true;
    });
  },
});

export const {
  setCheckedTodo,
  setIsAuthUser,
  setIsShowAuth,
  setIsShowRegOrAuth,
  resetDataUser,
  setIsShowMessage,
  setUserData,
  setShowLoader,
  setUsers,
  setMessageUser,
  setResetMessageUser,
} = usersSlice.actions;

export default usersSlice.reducer;
