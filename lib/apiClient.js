import AsyncStorage from "@react-native-async-storage/async-storage";

import { config } from "../appconfig";

export const getCurentUser = async () => {
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

export async function PostRequest(path, body) {
    try {
        const url = config.baseURL + path;
        const session = await AsyncStorage.getItem('session');
        // create a header
        const headers = {
            'Content-Type': 'application/json',
        };
        var request = null;
        if (session) {
            request = new Request(url, {
                method: 'POST',
                session: session,
                headers: headers,
                body: JSON.stringify(body),
            });
        }
        else {
            request = new Request(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });
        }

        const response = await fetch(request);

        return response;
    } catch (error) {
        throw error;
    }
}

export async function GetRequest(path, params) {
    try {
        // Tạo URL và thêm query parameters
        let url = new URL(config.baseURL + path);

        // Thêm params vào URL nếu có
        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        }

        const session = await AsyncStorage.getItem('session');

        // create a header
        const headers = {
            'Content-Type': 'application/json',
            'Cookie': session,
        };

        request = new Request(url, {
            method: 'GET',
            headers: headers
        });

        const response = await fetch(request);

        if (response && response.status == 200) {
            const data = await response.json();
            newSession = await response.headers.get('set-cookie');
            if (newSession && newSession != session) {
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

export async function PutRequest(path, body) {
    try {
        const url = config.baseURL + path;
        const session = await AsyncStorage.getItem('session');
        // create a header
        const headers = {
            'Content-Type': 'application/json',
        };
        var request = null;
        if (session) {
            request = new Request(url, {
                method: 'PUT',
                session: session,
                headers: headers,
                body: JSON.stringify(body),
            });
        }
        else {
            request = new Request(url, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body),
            });
        }

        const response = await fetch(request);

        return response;
    } catch (error) {
        throw error;
    }
}

export async function DeleteRequest(path, body) {
    try {
        const url = config.baseURL + path;
        const session = await AsyncStorage.getItem('session');
        // create a header
        const headers = {
            'Content-Type': 'application/json',
        };
        var request = null;
        if (session) {
            request = new Request(url, {
                method: 'DELETE',
                session: session,
                headers: headers,
                body: JSON.stringify(body),
            });
        }
        else {
            request = new Request(url, {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify(body),
            });
        }

        const response = await fetch(request);

        return response;
    } catch (error) {
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
        const response = await PostRequest('/register', body);

        // Parse the response as JSON
        const responseData = await response.json();
        console.log(responseData.user);
        if (response.status != 201) {
            throw new Error(responseData.message)
        }
        if (response.headers.get('set-cookie')) {
            AsyncStorage.setItem('session', response.headers.get('set-cookie'));
        }
        if (responseData.user) {
            AsyncStorage.setItem('username', responseData.user.username);
            AsyncStorage.setItem('password', responseData.user.password);
            AsyncStorage.setItem('email', responseData.user.email);
            AsyncStorage.setItem('avatar', responseData.user.avatar);
        }
        return responseData.user;

    } catch (error) {
        throw error;
    }
}


export const signIn = async (email, password) => {
    try {
        const body = {
            'email': email,
            'password': password,
        }

        const response = await PostRequest('/login', body);

        // Parse the response as JSON
        const responseData = await response.json();
        console.log(responseData.user);
        if (response.status != 200) {
            return null;
        }
        if (response.headers.get('set-cookie')) {
            AsyncStorage.setItem('session', response.headers.get('set-cookie'));
        }
        console.log(responseData);
        if (responseData.user) {
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

export const signOut = async () => {
    try {

    } catch (error) {
        throw error;
    }
}

export const getCurrentUser = async () => {
    try {
        const currentEmail = await AsyncStorage.getItem('email');
        if (currentEmail) {
            const response = await GetRequest('/user');
            if (response) {
                return response;
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
}

