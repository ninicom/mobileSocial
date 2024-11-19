import { GetRequest, PostRequest } from "../apiClient";

export const getUser = async (userId) => {
    try {
        if (!userId) {
            return null;
        }
        const response = await GetRequest('/user/people/' + userId);
        if (response.user) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}