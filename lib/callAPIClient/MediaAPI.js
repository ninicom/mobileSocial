import { GetRequest, PostRequest, DeleteRequest, PutRequest } from "../apiClient"

export const GetMediaDetails = async (mediaId) => {
    try {
        const responseData = GetRequest('/media/' + mediaId);
        if (responseData) {
            return responseData;
        }
        return null;
    } catch (error) {
        console.log('Chat error:', error);
        throw error;
    }
}