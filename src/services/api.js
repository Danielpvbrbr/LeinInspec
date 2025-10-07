import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:9000' : `${window.location.origin}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
