import axios from 'axios';

const api = axios.create({
    baseURL: '',//http://45.226.239.199:9000 //Modo local
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
