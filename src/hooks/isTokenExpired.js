import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
    try {        
        const decoded = jwtDecode(token);
        console.log(decoded.exp < Date.now() / 1000);
        return decoded.exp < Date.now() / 1000;
    } catch (error) {
        return true;
    }
};