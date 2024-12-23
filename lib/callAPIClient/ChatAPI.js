import { GetRequest, PostRequest, DeleteRequest, PutRequest } from "../apiClient"

export const getChats = async () => {
    try {
        const responseData = await GetRequest('/chat/');
        if(responseData){
            return responseData;
        }
        throw new Error(responseData.message);        
    } catch (error) {
        console.log('Chat error:', error);
        throw error;
    }
}

export const getChatId = async (userId) => {
    try {
        const responseData = await GetRequest('/chat/chatId/'+userId);
        if(responseData){
            return responseData;
        }
        return null;      
    } catch (error) {
        console.log('Chat error:', error);
        throw error;
    }
}

export const readChat = async () => {

}

export const createGroupChat = async (groupName) => {
    try {

    } catch (error) {
        console.log('Chat error:', error);
        throw error;
    }
}

export const addMember = async (userId) => {
    try {

    } catch (error) {
        console.log('Chat error:', error);
        throw error;
    }
}

export const removeMember = async (userId) => {
    try {

    } catch (error) {
        console.log('Chat error:', error);
        throw error;
    }
}

export const changeNameGroup = async () => {
    try {

    } catch (error) {
        console.log('Chat error:', error);
        throw error;
    }
}

export const createChat = async () => {

}

export const changeMemberRole = async () => {

}
