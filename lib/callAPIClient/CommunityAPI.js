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

export const addMember = async () => {

}