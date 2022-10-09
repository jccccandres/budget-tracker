import axiosInstance from "./AxiosInstance";

const getMonthsYear = async(data) => {
  return await axiosInstance
    .get(process.env.REACT_APP_API_URL + "transactionMonths");
}

const getTransactions = async(data) => {
  return await axiosInstance
    .get(process.env.REACT_APP_API_URL + "transactions", {
      params: data
    });
}

const createTransaction = async(data) => {
  return await axiosInstance
    .post(process.env.REACT_APP_API_URL + "transactions", data)
    .then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
}

export { getMonthsYear, getTransactions, createTransaction };