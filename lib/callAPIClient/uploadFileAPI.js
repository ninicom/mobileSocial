import { config } from "../../appconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function uploadFile(file) {
    try {
        console.log('Files to upload:', file);

        const url = config.baseURL + '/media/upload';
        const session = await AsyncStorage.getItem('session');

        // Xác định loại media dựa trên mimeType 
        let mediaType = 'unknown'; 
        if (file.mimeType.startsWith('image/')) { 
            mediaType = 'Image'; 
        } else if (file.mimeType.startsWith('video/')) { 
            mediaType = 'video'; 
        } else if (file.mimeType.startsWith('audio/')) {
            mediaType = 'Audio';
        }
        // Tạo FormData chỉ chứa file và loại media
        const formData = new FormData();

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
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
}
