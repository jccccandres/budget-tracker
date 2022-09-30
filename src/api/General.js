import axios from "axios";
import axiosInstance from "./AxiosInstance";

const login = async(data) => {
  return await axios
    .post(process.env.REACT_APP_API_URL + "login", data)
    .then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
}

const logout = async(data) => {
  return await axiosInstance
    .post(process.env.REACT_APP_API_URL + "logout", data)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error;
    });
}

const register = async(data) => {
  return await axios
    .post(process.env.REACT_APP_API_URL + "register", data)
    .then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
}

export { login, logout, register };