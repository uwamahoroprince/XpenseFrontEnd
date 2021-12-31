import axios from "axios";
import { url } from "../constants/constants";
export const postAccount = async (account) => {
  try {
    const response = await axios.post(`${url.postAccount}`, account);
  } catch (error) {
    console.log(error);
  }
};
