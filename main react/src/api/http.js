import axios from "axios";
import { getSession } from "./session";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// Add a request interceptor

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getSession();
    if (token && config.method !== "GET") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response.data.error.message);
    // return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(JSON.stringify(error, null, 2));

    //return Promise.reject(error.message);
    if (error.response.data.error) {
      return Promise.reject(error.response.data.error);
    }

    return Promise.reject(error);
  }
);

export default instance;
