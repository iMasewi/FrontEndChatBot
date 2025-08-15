import { TokenStorage } from '../utils/tokenStorage';

export const login = async (email: string, password: string) => {
    try {
        const { $api } = useNuxtApp();
        const response = await $api.post('/Auth/login', {
            email: email,
            password: password
        });
        if (!response.data) {
            throw new Error('Login failed');
        }
        TokenStorage.setToken(response.data.token);
        console.log('Login successful:', response.data);
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export const register = async (name: string, email: string, password: string) => {
    try {
        const { $api } = useNuxtApp();
        const response = await $api.post('/User', {
            name: name,
            email: email,
            passwordHash: password,
            role: 'User'
        });
        if (!response.data) {
            throw new Error('Registration failed');
        }
        console.log('Registration successful:', response.data);
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export const logout = () => {
    try{
        TokenStorage.removeToken();
        return true;
    } catch (error) {
        console.error('Error during logout:', error);
        return false;
    }
}


// export const loginWithGoogle = async () => {
//     try {
//         window.location.href = 'https://localhost:7174/api/Auth/loginGoogle?returnUrl=http://localhost:3000'
//     } catch (error) {
//         console.error('Error:', error);
//         return false;
//     }
// }