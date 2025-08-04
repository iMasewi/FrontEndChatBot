export const login = async (email: string, password: string) => {
    try {
        const response = await fetch('https://localhost:7222/api/Auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('Login successful:', data);
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export const register = async (name: string, email: string, password: string) => {
    try {
        const response = await fetch('https://localhost:7222/api/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: name,
                email: email,
                passwordHash: password,
                role: 'User'  
            }),
        });
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        const data = await response.json();
        console.log('Registration successful:', data);
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export const logout = () => {
    try{
        localStorage.removeItem('token');
        return true;
    } catch (error) {
        console.error('Error during logout:', error);
        return false;
    }
}

export const statusUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const res = await fetch('https://localhost:7222/api/Auth', {
            method: 'GET',
            headers: { 'Authorization': token }
        });
        return res.ok;
    } catch {
        return false;
    }
};

// export const loginWithGoogle = async () => {
//     try {
//         window.location.href = 'https://localhost:7174/api/Auth/loginGoogle?returnUrl=http://localhost:3000'
//     } catch (error) {
//         console.error('Error:', error);
//         return false;
//     }
// }