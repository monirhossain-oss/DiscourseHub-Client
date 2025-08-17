import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://server-nine-eta.vercel.app/',
})

const useAxios = () => {

    return axiosInstance;
};

export default useAxios;