import axios from 'axios';
const axiosRequest = axios.create ({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${null}`
    }
});
export default axiosRequest;

