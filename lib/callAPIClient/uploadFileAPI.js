import { config } from "../../appconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Hàm upload với retry
export async function uploadFile(file) {
    const maxRetries = 5;  // Số lần thử lại tối đa
    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            // Gọi hàm upload
            const url = config.baseURL + '/media/upload';
            const session = await AsyncStorage.getItem('session');

            if (!session) {
                throw new Error("No session found. Please log in again.");
            }

            // Xác định loại media dựa trên mimeType hoặc file extension nếu không có mimeType
            let mediaType = 'unknown'; 
            if (file.mimeType) {
                if (file.mimeType.startsWith('image/')) {
                    mediaType = 'Image';
                } else if (file.mimeType.startsWith('video/')) {
                    mediaType = 'video';
                } else if (file.mimeType.startsWith('audio/')) {
                    mediaType = 'Audio';
                }
            } else if (file.uri) {
                const fileExtension = file.uri.split('.').pop().toLowerCase();
                if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                    mediaType = 'Image';
                } else if (['mp4', 'mkv', 'avi'].includes(fileExtension)) {
                    mediaType = 'video';
                } else if (['mp3', 'wav', 'aac'].includes(fileExtension)) {
                    mediaType = 'Audio';
                }
            }

            // Tạo FormData chỉ chứa file và loại media
            const formData = new FormData();

            if (!file.uri || !file.name) {
                throw new Error('Invalid file provided.');
            }

            formData.append('media', {
                uri: file.uri,
                name: file.name || 'media',
                type: file.mimeType || 'application/octet-stream',
            });
            
            formData.append('MediaType', mediaType);

            // Tạo headers, không cần đặt Content-Type
            const headers = {
                'Cookie': session,
            };

            // Gửi request
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }

            const responseData = await response.json();
            return responseData.data;
        } catch (error) {
            attempts++;
            if (attempts >= maxRetries) {
                // Nếu đã thử tối đa số lần mà vẫn thất bại, ném lỗi
                throw new Error("Upload failed after maximum retries.");
            }

            // Thêm thời gian chờ trước khi thử lại (1 giây)
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}
