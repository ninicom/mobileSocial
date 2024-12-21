import { uploadFile } from "./uploadFileAPI";
import { GetRequest, PostRequest, DeleteRequest } from "../apiClient";

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
            const data = await response.json();
            console.log(data);
            return false;
        }
        return true;

    } catch (error) {
        throw error;
    }
}

export const getPost = async (postId) => {
    try {
        const response = await GetRequest("/post/" + postId);
        if (response) {
            return response;
        }
        return null;
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

export const searchPosts = async (query = "", page = 1, limit = 20) => {
    try {
        const response = await GetRequest('/post/searchpost/' + query + '/' + page + '/' + limit);
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export const likePost = async (PostId) => {
    try {
        const response = await PostRequest('/post/likePost/' + PostId);
        if (response.status == 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

export const unLikePost = async (PostId) => {
    try {
        const response = await DeleteRequest('/post/unLikePost/' + PostId);
        if (response.status == 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}