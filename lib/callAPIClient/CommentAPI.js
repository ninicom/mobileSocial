import { DeleteRequest, GetRequest, PostRequest } from "../apiClient";


export const getComment = async (postId) => {
    try {
        const response = await GetRequest('/comment/' + postId);
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export const createComment = async (postId, content) => {
    try {
        const body = {
            postId: postId,
            content: content,
        }
        const response = await PostRequest('/comment/', body);
        if (response.status != 200) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const likeComment = async (commetId) => {
    const response = await PostRequest('/comment/like/' + commetId)
    if (response.status == 200) {
        return true;
    }
    throw new Error('like error:');
}

export const unlikeComment = async (commentId) => {
    const response = await DeleteRequest('/comment/like/' + commentId)
    if (response.status == 200) {
        return true;
    }
    throw new Error('unlike error:');
}