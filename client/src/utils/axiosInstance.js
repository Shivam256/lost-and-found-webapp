import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://lostandfound-api.herokuapp.com'
    //baseUrl:'http://localhost:5000'
})




export default axiosInstance;