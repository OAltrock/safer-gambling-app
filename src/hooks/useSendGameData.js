import { useMutation } from 'react-query';
import axios from 'axios';

const sendData = async (data) => {
    console.log(localStorage.getItem('token'))
    const response = await axios.post('http://localhost:5000/add_games', data, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
};

export const useSendGameData = ( ) => {
    return useMutation(sendData)
}