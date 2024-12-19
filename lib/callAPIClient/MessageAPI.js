import { GetRequest, PostRequest, DeleteRequest, PutRequest } from "../apiClient"
import { uploadFile } from "./uploadFileAPI";

export const getMessages = async (ChatId) => {
    try {
        const responseData = GetRequest('/message/' + ChatId);
        if (responseData) {
            return responseData;
        }
        return null;
    } catch (error) {
        console.log('Chat error:', error);
        throw error;
    }
}
export const createMessage = async (chatId, repliedMessageId = null, form) => {
    try {
        // Upload tất cả các tệp trong form.data
        const mediaUploadPromises = form.data.map((file) => uploadFile(file));
        const mediaResults = await Promise.all(mediaUploadPromises);

        // Lấy danh sách ID của các tệp đã tải lên
        const mediaIds = mediaResults.map((media) => media._id);

        // Chuẩn bị nội dung body
        const body = {
            chatId: chatId,
            content: form.message,
            repliedMessageId: repliedMessageId,
            mediaIds: mediaIds
        };

        // Gửi request tạo bài đăng
        const response = await PostRequest('/message/sendmessage', body);

        if (response.status !== 201) {
            return false;
        }
        return true;

    } catch (error) {
        console.log('Create messages error:', error);
        throw error;
    }
}

export const deleteMessage = async (messageId) => {
    try {

    } catch (error) {
        console.log('Chat error', error);
        throw error;
    }
}

export const likeMessages = async () => {
    try {

    } catch (error) {
        console.log('Chat error:', error);
        throw error;
    }
}