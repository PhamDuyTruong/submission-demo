import axiosClient from './axiosClient';
import axios from "axios"
interface UserLogin{
    email: string
    password: string
}

interface UserRegister{
    username: string
    email: string
    phone: string
    password: string
}

const authApi = {
    loginUser: (value: UserLogin) => {
        return axios.post("http://localhost:8000/api/auth/login", value);
    },
    registerUser: (value: UserRegister) => {
        return axiosClient.post("http://localhost:8000/api/auth/register", value)
    },
};

export default authApi;