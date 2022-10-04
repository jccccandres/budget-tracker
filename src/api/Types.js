import axiosInstance from "./AxiosInstance";

const getTypes = async(data) => {
  return await axiosInstance
    .get(process.env.REACT_APP_API_URL + "types");
}

const createType = async(data) => {
  return await axiosInstance
    .post(process.env.REACT_APP_API_URL + "categories", data)
    .then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
}

export { getTypes, createType };