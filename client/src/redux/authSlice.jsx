import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => ({
  user: null,
  token: null,
});

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    resetAuthInfo: (state) => Object.assign(state, getInitialState()),
    updateAuthInfo: (state, { payload }) => {
      const { user, token } = payload;
      state.user = user;
      state.token = token;
    },
  },
});

const { reducer , actions } = authSlice;

export const { updateAuthInfo, resetAuthInfo } = actions;
export default reducer;
