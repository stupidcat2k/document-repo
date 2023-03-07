import { $http } from "@/core/HttpClient";

const BASE_URL = 'api/space';

export const getAllSpace = async () => {
    return await $http.get(`${BASE_URL}/`);
};

export const createSpace = async (payload) => {
    return await $http.post(`${BASE_URL}/create`, payload);
}