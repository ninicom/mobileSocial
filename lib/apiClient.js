import AsyncStorage from "@react-native-async-storage/async-storage";

export const config = {
    baseURL: 'http://192.168.20.28:3000/api',
}


async function createRequest(path, method='POST', body) {

    const url = config.baseURL + path;
    const session = await AsyncStorage.getItem('session');

    // create a header
    const headers = {
        'Content-Type': 'application/json',
    };
    var request = null;
    if(session){
        request = new Request(url, {        
            method: method,  
            session: session,      
            headers: headers,
            body: JSON.stringify(body),
        });
    }
    else {
        request = new Request(url, {        
            method: method,        
            headers: headers,
            body: JSON.stringify(body),
        });
    }
    return request;
}

async function createRequestGet(path) {

    const url = config.baseURL + path;
    const session = await AsyncStorage.getItem('session');

    // create a header
    const headers = {
        'Content-Type': 'application/json',
    };
    console.log(session);
    if(session){
        request = new Request(url, {        
            method: 'GET',  
            session: session,      
            headers: headers
        });
    }
    else {
        request = new Request(url, {        
            method: 'GET',        
            headers: headers
        });
    }
    return request;
}


export const createUser = async (email, phone, password, username) => {
    try {
        body = {
            'email': email,
            'phone': phone,
            'password': password,
            'username': username,
        }
        const request = await createRequest('/register', 'POST', body);

        const response = await fetch(request);     
        // Parse the response as JSON
        const responseData = await response.json();

        if(response.status != 201) {
            throw new Error(responseData.message)
        }        
        AsyncStorage.setItem('session', response.headers.get('set-cookie'));
        AsyncStorage.setItem('currentEmail', responseData.user.email);
        return responseData;
        
    } catch (error) {
        throw error;
    }
}


export const signIn = async (email, password) => {

}

export const singOut = async () => {

}

export const getCurrentUser = async () => {
    try {
        const currentEmail = await AsyncStorage.getItem('currentEmail');
        console.log(currentEmail);
        const body = {
            email: currentEmail,
        }
        const request = await createRequestGet('/user/user?email='+currentEmail)
        const response = await fetch(request);
        if(response) {
            var user = await response.json();
            console.log(user);
        }
        return null;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllPosts = async () => {

}

export const getLastedPosts = async () => {

}

export const searchPosts = async () => {

}

export const getUserPost = async () => {
    
}

export const getFilePreview = async (fileId, type) => {

}

export const uploadFile = async (file, type) => {
    
}

export const createVideo = async (form) => {
    
}

