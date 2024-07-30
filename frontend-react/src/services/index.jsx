import axios from "axios";
export const BASE_URL = import.meta.env.VITE_API_URL;

// header
export const myHeader = () => {
  return {
    "Content-Type": "application/json",
  };
};

const useAxios = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export default useAxios;
