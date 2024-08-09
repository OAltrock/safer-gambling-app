import { useMutation } from 'react-query';
import axios from 'axios';

const login = async ({ email, password }) => {
    const response = await axios.post('http://localhost:5000/login', {
        usermail: email,
        password: password
    });
    console.log(response)
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user', response.data.user_name); // Store the token
    return response.data; // Return the response data if needed
};

export const useLogin = () => {
    return useMutation(login);
};