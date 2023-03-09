import { $http } from "@/core/HttpClient";

const BASE_URL = 'api/doc';

export const getAllDocBySpcId = async (payload) => {
    return await $http.get(`${BASE_URL}/${payload}`);
};

export const updateDoc = async (payload) => {
    return await $http.put(`${BASE_URL}/update`,payload);
}

export const deleteDoc = async (payload) => {
    return await $http.delete(`${BASE_URL}/deleteById/${payload}`);
}

export const createDoc = async (payload) => {
    return await $http.post(`${BASE_URL}/create`,payload);
}