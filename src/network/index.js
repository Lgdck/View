import axios from 'axios';
import service from "../utils/request";


const instance = axios.create({
    // baseURL:'http://192.168.3.93:8001/',
    // baseURL:'http://127.0.0.1:8081/',
    baseURL:'http://127.0.0.1:8001/',
    timeout:100000,
})
// 默认为：application/x-www-form-urlencoded;charset=UTF-8
instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

instance.interceptors.request.use(
    config => {

        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);



export default instance
