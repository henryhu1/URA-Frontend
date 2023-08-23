import axios, { isAxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
api.defaults.xsrfHeaderName = "X-CSRFTOKEN";
api.defaults.xsrfCookieName = "csrftoken";

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // TODO have error handling flow
    if (isAxiosError(error)) {
      console.error('This is an Axios error!', error);
      if (error.response?.status == 401) {
        localStorage.removeItem('token');
      }
    } else {
      console.error('This is a general error', error);
    }
    return Promise.reject(error);
  }
);

export { api, isAxiosError };
