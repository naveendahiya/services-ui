import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
});


export default apiClient;