import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
//   console.log(`[Axios] Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // console.error('[Axios] Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
