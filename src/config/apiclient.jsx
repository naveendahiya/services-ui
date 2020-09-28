import axios from 'axios';

let token = localStorage.getItem('token')

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Token ${token}`,
    },
});


export default apiClient;