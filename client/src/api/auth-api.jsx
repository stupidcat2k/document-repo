import { $http } from "@/core/HttpClient";

const BASE_URL = 'api/auth';

export const login = async (payload) => {
    return await $http.post(`${BASE_URL}/login`, payload , { withCredentials: true });
};

export const logout = async () => {
    return await $http.get(`${BASE_URL}/logout`, {}, { withCredentials: true });
};

export const refreshToken = async () => {
    return await $http.post(`${BASE_URL}/token`, {}, { withCredentials: true });
};
