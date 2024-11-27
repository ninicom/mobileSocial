import { PostRequest } from "../apiClient";
import { uploadFile } from "./uploadFileAPI";
import { GetRequest } from "../apiClient";

export const createPost = async (form) => {
    try {
        const media = await uploadFile(form.media);
        var body = {
            content: form.content,
            mediaIds: [media._id],
            communityId: form.communityId || null,
            isCommunity: form.communityId ? true : false
        }
        const response = await PostRequest('/post/pushpost', body);
        if (response.status != 200) {
            return false;
        }
        return true;

    } catch (error) {
        throw error;
    }
}

export const getNewPost = async (page = 1, limit = 20) => {
    try {
        const response = await GetRequest('/post/getNewPost/' + page + '/' + limit);
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}