import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = 'http://localhost:5000/api/';

const httpClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response && error.response.status === 401) {
    //   // Handle unauthorized access, e.g., redirect to login
    //   window.location.href = '/login';
    // }
    // return Promise.reject(error);
  }
);

export default httpClient;