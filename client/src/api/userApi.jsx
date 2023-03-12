import { $http } from "@/core/HttpClient";

const BASE_URL = 'api/user';

export const getAllUser = async () => {
    return await $http.get(`${BASE_URL}/`);
};

export const createUser = async (payload) => {
    return await $http.post(`${BASE_URL}/`, payload);
}

export const updateUser = async (payload) => {
    return await $http.put(`${BASE_URL}/update-user`,payload);
}
