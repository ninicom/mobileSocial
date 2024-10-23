import { Client, Account, ID, Models, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.quyenstudy.study',
    projectId: '66f61efd00071bbaa85d',
    databaseId: '66f6205c00121b67faed',
    userCollectionId: '66f620a5000f79cf8a64',
    videoCollectionId: '66f620da0025fff76e4c',
    storageId: '66f6235d002c56e61e7a',
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avartars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
    // Register Users
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        const avatarUrl = avartars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;

    } catch (error) {
        console.log(error);
    }
}

// Get Account
export async function getAccount() {
    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}
  

export const signIn = async (email, password) => {
    try {
        console.log(email, password);
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log("Sign in error:",error);
        return null;
    }
} 


export const getCurrentUser = async () => {
    try {
        const currentAccount = await getAccount();
        if(!currentAccount) console.log("Current Acount error: ",Error);

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) console.log("Curent user error: ", Error);
        return currentUser.documents[0];
    } catch (error) {
        console.log("Get curent user error: ", Error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
        )
        return posts.documents;
    } catch (error) {
        console.log("Get all post has an error", error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        )
        return posts.documents;
    } catch (error) {
        console.log("Get all post has an error", error);
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query), Query.orderDesc('$createdAt'), Query.limit(7)]
        )
        return posts.documents;
    } catch (error) {
        console.log("Search post has an error", error);
    }
}

export const getUserPost = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
        )
        return posts.documents;
    } catch (error) {
        console.log("Search post has an error", error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        console.log('Sign out error:', error);
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;

    try {
        if(type === 'video') {
            fileUrl = storage.getFilePreview(storageId, fileId);
        }
        else if(type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100);
        }
        else {
            console.log('Get file preview invalid file type');
            throw new Error("Invalid file type");
        }

        if(!fileUrl) {
            console.log('Get file preview error');
            throw new Error;
        }
        console.log('File url:', fileUrl)
        return fileUrl;        
    } catch (error) {
        console.log('Get file preview error:', error);
        throw new Error(error);
    }
}

export const uploadFile = async (file, type) => {
    if(!file) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;
    } catch (error) {
        console.log('Upload file error:', error);
        throw new Error(error);
    }
}

export const createVideo = async (form) => {
    try {
        const [thumnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ]);
        console.log(1);
        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )
        console.log(2);
        return newPost;

    } catch (error) {
        console.log('Create video error', error);
        throw new Error(error);
    }
}