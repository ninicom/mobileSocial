import { GetRequest, PostRequest, DeleteRequest, PutRequest } from "../apiClient"
import { uploadFile } from "./uploadFileAPI";

export const getMyCommunity = async () => {
    try {
        const response = await GetRequest("/community/");
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export const getCommunity = async (communityId) => {
    try {
        if (!communityId) {
            return null;
        }
        const response = await GetRequest("/community/getCommunity/" + communityId);
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export const searchCommunity = async (query) => {
    try {
        const response = await GetRequest("/community/find/" + query);
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}


export const createCommunity = async (form) => {
    try {
        console.log(form);
        const media = await uploadFile(form.media);
        const body = {
            name: form.communityName,
            description: form.description,
            communityPicture: [media._id],
            isprivate: form.isPrivate,
        }
        const response = await PostRequest('/community/create', body);
        if (response.status != 201) {
            return false;
        }
        return true;
    } catch (error) {
        throw error;
    }
}

export const addMember = async (communityId, useradd) => {
    try {
        const body = {
            CommunityId: communityId,
            userAdd: useradd
        }
        const response = await PostRequest('/community/addMember', body);
        if (response.status != 201) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }
        return true;
    } catch (error) {
        throw error;
    }
}

export const getMemmberToAdd = async (communityId) => {
    try {
        const response = await GetRequest('/community/memberToAdd/' + communityId);
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export const getMember = async (CommunityId) => {
    try {
        const response = await GetRequest("/community/member/" + CommunityId);
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}
