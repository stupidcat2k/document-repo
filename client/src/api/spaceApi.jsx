import { $http } from "@/core/HttpClient";

const BASE_URL = 'api/space';

export const getAllSpace = async () => {
    return await $http.get(`${BASE_URL}/`);
};

