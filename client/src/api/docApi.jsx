import { $http } from "@/core/HttpClient";

const BASE_URL = 'api/doc';

export const getAllDocBySpcId = async (payload) => {
    return await $http.get(`${BASE_URL}/${payload}`);
};
