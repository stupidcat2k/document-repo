import { $http } from "@/core/HttpClient";

const BASE_URL = 'api/doc';

export const getAllDocBySpcId = async (payload) => {
    return await $http.get(`${BASE_URL}/${payload}`);
};

export const getDocDetailsByHdrId = async (payload) => {
    return await $http.get(`${BASE_URL}/${payload}`);
}

export const getFileByHdrId = async (payload) => {
    return await $http.get(`${BASE_URL}/file/${payload}`);
}

export const updateDocName = async (payload) => {
    return await $http.put(`${BASE_URL}/update-doc-name`,payload);
}

export const updateDocDetails = async (payload) => {
    return await $http.put(`${BASE_URL}/update-doc-details`,payload);
}

export const deleteDoc = async (payload) => {
    return await $http.delete(`${BASE_URL}/delete-by-id/${payload}`);
}

export const createDoc = async (payload) => {
    return await $http.post(`${BASE_URL}/create`,payload);
}