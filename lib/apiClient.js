import AsyncStorage from "@react-native-async-storage/async-storage";

export const config = {
    baseURL: 'http://192.168.1.154:3000/api',
}

const getCurentUser = async () => {
    try {
        avatar = await AsyncStorage.getItem('avatar');
        email = await AsyncStorage.getItem('email');
        password = await AsyncStorage.getItem('password');
        username = await AsyncStorage.getItem('username');

        const user = {
            avatar: avatar,
            email: email,
            password: password,
            username: username,
        }
        return user;

    } catch (error) {
        return null;
    }
    
}

async function createRequest(path, method='POST', body) {

    const url = config.baseURL + path;
    const session = await AsyncStorage.getItem('session');
    const user = await getCurentUser();
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

async function GetRequest(path) {
    try {
        const url = config.baseURL + path;
        const session = await AsyncStorage.getItem('session');

        // create a header
        const headers = {
            'Content-Type': 'application/json',
            'Cookie': session,
        };
        console.log(session);
        if(session){
            request = new Request(url, {        
                method: 'GET',    
                headers: headers
            });
        }
        else {
            request = new Request(url, {        
                method: 'GET',        
                headers: headers
            });
        }

        const response = await fetch(request);

        if(response) {
            const data = await response.json();
            newSession = await response.headers.get('set-cookie');
            console.log('new sesion', newSession);
            if(newSession && newSession != session) {
                AsyncStorage.setItem('session', newSession);
            }
            return data;
        }
        return null
    } catch (error) {
        console.log(error);
        throw error;
    }
    
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
        console.log(responseData.user);
        if(response.status != 201) {
            throw new Error(responseData.message)
        }        
        if(response.headers.get('set-cookie')) {
            AsyncStorage.setItem('session', response.headers.get('set-cookie'));
        }
        if(responseData.user) {
            AsyncStorage.setItem('username', responseData.user.username);
            AsyncStorage.setItem('password', responseData.user.password);
            AsyncStorage.setItem('email', responseData.user.email);
            AsyncStorage.setItem('avatar', responseData.user.avatar);
        }        
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
        const response = await GetRequest('/user/user?email='+currentEmail);
        console.log('response', response);
        if(response) {
            return response;
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

