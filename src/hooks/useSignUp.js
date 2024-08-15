import { useMutation } from 'react-query';
import axios from 'axios';

const signUp = async ({ userName, password, age }) => {
    const response = await axios.post('http://localhost:5000/add_user', {
        userName: userName,
        password: password,
        age: age
    });
    console.log(response)
    localStorage.setItem('token', response.data.access_token); // Store the token
    localStorage.setItem('user', response.data.user_name.replace(',',''));
    return response.data;
};

export const useSignUp = () => {
    return useMutation(signUp);
};