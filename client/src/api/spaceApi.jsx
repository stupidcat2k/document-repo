import { $http } from "@/core/HttpClient";

const BASE_URL = 'api/space';

export const getAllSpace = async (payload) => {
    return await $http.get(`${BASE_URL}/spaceByStatus/${payload}`);
};

export const createSpace = async (payload) => {
    return await $http.post(`${BASE_URL}/create`, payload);
}

export const updateSpace = async (payload) => {
    return await $http.put(`${BASE_URL}/update`,payload);
}

export const deleteSpace = async (payload) => {
    return await $http.delete(`${BASE_URL}/deleteById/${payload}`);
}

export const deleteSpacePermanent = async (payload) => {
    return await $http.delete(`${BASE_URL}/deletePermanent/${payload}`);
}