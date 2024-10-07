import { Client, Account, ID, Models, Avatars, Databases, Query } from 'react-native-appwrite';

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

        const avartarUrl = avartars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.ID,
                email,
                username,
                avartar: avartarUrl
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
        const session = await account.createEmailPasswordSession(email, password);
        console.log("session:", session);
        return session;
    } catch (error) {
        console.log("Sign in error:",error);
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
