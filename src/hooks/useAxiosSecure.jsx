import axios from 'axios';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: `http://localhost:5000/`
})

const useAxiosSecure = () => {
    const { user } = useAuth();
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        // console.log(config.headers.Authorization)
        return config;
    }, error => {
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;