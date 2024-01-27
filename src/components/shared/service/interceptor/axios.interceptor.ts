import axios, { InternalAxiosRequestConfig } from "axios";
import { Url_api } from "../../constants/global";

export const http = axios.create({
  baseURL: Url_api,
});

http.interceptors.request.use(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: InternalAxiosRequestConfig<any>
  ) => {
    // return config;
    if (config.url?.includes("login")) return config;
    else {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    }
  },
  (err) => Promise.reject(err)
);

http.interceptors.response.use(res => {
  return res;
}, err => {
  console.log(err);
  if ((err.response.status == 401 || err.response.status == 403) && !window.location.href.includes('login')) {
    window.location.href = '/login?redirect=true'
  } else {
    console.log('reject error')
    Promise.reject(err)
  }

})
