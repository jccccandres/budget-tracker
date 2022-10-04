import axiosInstance from "./AxiosInstance";

const getCategories = async(data) => {
  return await axiosInstance
    .get(process.env.REACT_APP_API_URL + "categories");
}

export { getCategories }