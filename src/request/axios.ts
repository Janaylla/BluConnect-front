import axios from "axios";

const token = localStorage.getItem('token');

 const api = axios.create({
    baseURL: 'http://localhost:4001',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : undefined,
    },
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Remove o token do localStorage
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);
export { api };