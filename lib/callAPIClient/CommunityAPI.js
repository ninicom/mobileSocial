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


export const removeMember = async (communityId, userId) => {
    try {
        const body = {
            CommunityId: communityId,
            userDeleteId: userId
        }
        const response = await DeleteRequest("/community/removeMember", body);
        if (response.status = 200) {
            return true;
        }
        const responseData = await response.json();
        throw new Error(responseData.message);
        
    } catch (error) {
        throw error;
    }
}

export const outCommunity = async (communityId) => {
    try {
        const body = {
            CommunityId: communityId
        }
        const response = await DeleteRequest("/community/outCommunity", body);
        if (response.status == 200) {
            return true;
        }
        const responseData = await response.json();
        throw new Error(responseData.message);
        
    } catch (error) {
        throw error;
    }
}


export const joinCommunity = async (communityId) => {
    try {
        const body = {
            CommunityId: communityId
        }
        const response = await PostRequest("/community/joinCommunity", body);
        if (response.status == 201) {
            return true;
        }
        const responseData = await response.json();
        throw new Error(responseData.message);
        
    } catch (error) {
        throw error;
    }
}