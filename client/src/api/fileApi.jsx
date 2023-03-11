import { $http } from "@/core/HttpClient";

const BASE_URL = 'api/file';

export const uploadFile = async (formData) => {
    return await $http.upload(`${BASE_URL}/upload`, formData);
};

export const deleteFile = async (payload) => {
    return await $http.delete(`${BASE_URL}/${payload}`);
}