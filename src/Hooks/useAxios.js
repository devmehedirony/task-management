import axios from "axios";


const axiosInstance = axios.create({
  baseURL: 'https://task-management-server-klfw.onrender.com'
})

export const useAxios = () => {
  return axiosInstance
};