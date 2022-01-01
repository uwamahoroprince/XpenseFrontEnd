import axios from "axios";
import { url } from "../constants/constants";
export const postTransactions = async (transaction) => {
  try {
    const response = await axios.post(`${url.postTrasaction}`, transaction);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
