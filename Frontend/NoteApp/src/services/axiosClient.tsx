import axios from "axios";
import {redirect} from 'react-router-dom'

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    // Handle response from user
    return response;
  },
  // Handle response if result is error
  (error) => {
    if (error.status === 401) {
      localStorage.clear();
      return redirect("/")
    }
    return Promise.reject(error);
  }
);
export default axiosClient;