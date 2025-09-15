import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: {
    uid: '',
    name: '',
    email: '',
    monthlyConnection: null,
    usedConnection: null
   },
  isLoading: false,
  isAuth: false,
  error: '',
  error2: '',
  message: '',
  message2: '',
  modalVisible: false,
  modalVisible2: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
      state.error = '';
      state.message = '';
    },
    loginSuccess: (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.user.uid = action.payload.uid;
        state.isAuth = true;
        state.error = '';
        state.message = '';
        state.modalVisible = false;
    },
    loginFailed: (state, { payload }) => {
      (state.isLoading = false);
        (state.error = payload.errorMessage);
    },
    updateUsedConnection: (state, action) => {
      state.user.usedConnection = action.payload.usedConnectionCount;
  },
    logoutPending: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      // reset: () => initialState
      return {
        ...initialState,
      };
    },
    signupPending: (state) => {
      (state.isLoading = true);
        (state.error = '');
        (state.message = '');
    },
    signupSuccess: (state) => {
      (state.isLoading = false); 
      (state.modalVisible = true);
    },
    signupFailed: (state, { payload }) => {
      (state.isLoading = false); 
      (state.error2 = payload.errorMessage);
      (state.message2 = payload.msg);
      (state.modalVisible2 = false);
    },
    closeModal: (state) => {
      state.modalVisible = false;
    },
  },
});

const { actions, reducer } = loginSlice;

export const {
  loginPending,
  loginSuccess,
  loginFailed,
  updateUsedConnection,
  logoutPending,
  logoutSuccess,
  signupPending,
  signupSuccess,
  signupFailed,
  closeModal,
} = actions;

export default reducer;


