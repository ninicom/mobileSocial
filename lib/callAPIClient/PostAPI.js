import { uploadFile } from "./uploadFileAPI";

export const createPost = async (form) => {
    try {
        console.log(form)
        const media = await uploadFile(form.media);
        console.log(media)
        return newPost;

    } catch (error) {
        console.log('Create video error', error);
        throw new Error(error);
    }
}