import { $http } from "@/core/HttpClient";

const BASE_URL = 'api/file';

export const uploadFile = async (payload) => {
    console.log(payload);
    return await $http.post(`${BASE_URL}/upload`, payload);
};
