import { GetRequest, PostRequest } from "../apiClient";

// lấy danh sách lời mời kết bạn đã nhận
export const getRequestFriend = async () => {
    try {
        const response = await GetRequest('/friend/Requestfriend');
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

// lấy danh sách gợi ý kết bạn
export const getFriendSuggestions = async () => {
    try {
        const response = await GetRequest('/friend/FriendSuggestions');
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

// lấy danh sách lời mời kết bạn đã nhận
export const getOrderFriend = async () => {
    try {
        const response = await GetRequest('/friend/Orderfriend');
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

// gửi lời mời kết bạn
export const addFriend = async (userId) => {
    try {
        const body = {
            receiverId: userId
        }
        const response = await PostRequest('/friend/addfriend', body);
        const responseData = await response.json();
        if (response.status == 200) {
            return true;
        }
        else {
            throw new Error(responseData.message);
        }

    } catch (error) {
        throw error;
    }
}

// hủy lời mời kết bạn
export const removeAddFriend = async (userId) => {
    try {
        const body = {
            receiverId: userId,
        }
        const response = await PostRequest('/friend/removeAddFriend', body);
        responseData = await response.json();
        if (response != 200) {
            return true;
        }
        else {
            throw new Error(responseData.message);
        }
    } catch (error) {
        throw error;
    }
}

// chấp nhận lời mời kết bạn
export const acceptFriend = async (userId) => {
    try {
        const body = {
            requestId: userId
        }
        const response = await PostRequest('/friend/acceptfriend', body);
        const responseData = await response.json();
        if (response.status == 200) {
            return true;
        }
        else {
            throw new Error(responseData.message);
        }

    } catch (error) {
        throw error;
    }
}

// không chấo nhận lời mời kết bạn
export const declineFriend = async (userId) => {
    try {
        const body = {
            requestId: userId
        }
        const response = await PostRequest('/friend/declinefriend', body);
        const responseData = await response.json();
        if (response.status == 200) {
            return true;
        }
        else {
            throw new Error(responseData.message);
        }

    } catch (error) {
        throw error;
    }
}

// khiểm tra trạng thái bạn bè
export const isFriend = async (userId) => {
    try {
        const response = await GetRequest('/friend/isFriend/' + userId);
        if (response) {
            return response;
        }
        return null;
    } catch (error) {
        throw error;
    }
}
