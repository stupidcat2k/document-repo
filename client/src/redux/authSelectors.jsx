export const selectAuthenticated = (state) => !!state.auth.token;

export const selectUsername = (state) => state.auth.user?.userName || "";

export const selectRoles = (state) => state.auth.user?.roles || "";

export const selectUserId = (state) => state.auth.user?.userId || "";
