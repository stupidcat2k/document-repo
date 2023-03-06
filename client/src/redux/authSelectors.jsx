export const selectAuthenticated = (state) => state.auth.token;

export const selectUsername = (state) => state.auth.user?.usrNm || "";

export const selectUserId = (state) => state.auth.user?.usrId || "";
