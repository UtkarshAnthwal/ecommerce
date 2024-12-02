import axios from "axios";

const axiosNewRequest = axios.create ({
    baseURL: 'http://localhost:5000/u_com/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('Token'))}`
    }
});
export default axiosNewRequest;