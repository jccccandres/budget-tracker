import axios from "axios";
import { useTokenStore } from '../stores/AuthenticateStore';



const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${useTokenStore.getState().token}`
  };

  return config;
})


export default axiosInstance;