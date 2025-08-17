import axios from 'axios';
import { getAuth } from 'firebase/auth';

const axiosSecure = axios.create({
    baseURL: 'https://server-nine-eta.vercel.app/',
});

const useAxiosSecure = () => {
    const auth = getAuth();

    axiosSecure.interceptors.request.use(
        async (config) => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const token = currentUser.accessToken;
                config.headers.Authorization = `Bearer ${token}`;
                // console.log(token)
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return axiosSecure;
};

export default useAxiosSecure;
