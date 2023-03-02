import { createAsyncThunk } from "@reduxjs/toolkit";
import __isNumber from "lodash/isNumber";
import { login, logout, refreshToken } from "../api/auth-api";
import { HTTP_REQUEST } from "../core/Constants";
import { $http } from "../core/HttpClient";
import { updateAuthInfo, resetAuthInfo } from "./authSlice";
import store from "@/redux/store";
import IntervalJob from "../utils/IntervalJob";

export const loadAuthentication = createAsyncThunk(
  "auth/loadAuthentication",
  async (_, { dispatch }) => {
    const { status, success } = saveAuthInfo(await refreshToken());
    if (success) {
      intervalTokenJob.start();
    } else if (status === HTTP_REQUEST.STATUS_CODES.SERVER_ERROR) {
      dispatch(logoutAction());
    }
  }
);

export const loginAction = createAsyncThunk("auth/login", async (payload) => {
  try {
    const { status, success, message } = saveAuthInfo(await login(payload));
    if (success) {
      intervalTokenJob.start();
    }
    const isBadCredential = status === HTTP_REQUEST.STATUS_CODES.BAD_REQUEST;
    return {
      success,
      message: isBadCredential ? "Invalid username or password" : message,
    };
  } catch (error) {
    return { success: false, message: "Oops, Somethings went wrong!" };
  }
});

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    intervalTokenJob.suspend();
    $http.removeAccessToken();
    dispatch(resetAuthInfo());
    await logout();
  }
);

const saveAuthInfo = (response) => {
  const { success, data } = response;
  if (success) {
    const { authUser, token } = data;

    $http.setAccessToken(token);
    store.dispatch(
      updateAuthInfo({
        user: authUser,
        token,
      })
    );
  }
  return { ...response };
};

const INTERVAL_REFRESH_TOKEN_TIME = 60000;

const autoRefreshToken = async () => {
  const token = store.getState().auth.token;
  const { exp } = jwtDecode(token);
  if (__isNumber(exp)) {
    const diffTime = exp * 1000 - Date.now();
    if (diffTime >= INTERVAL_REFRESH_TOKEN_TIME) {
      return;
    }
  }
  saveAuthInfo(await refreshToken());
};

const intervalTokenJob = new IntervalJob({
  event: autoRefreshToken,
  intervalTime: INTERVAL_REFRESH_TOKEN_TIME,
});
