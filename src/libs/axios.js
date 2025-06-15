import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://newel-assessment.onrender.com/api",
  withCredentials: true,
  timeout: 10000,
});

export default axiosInstance;
