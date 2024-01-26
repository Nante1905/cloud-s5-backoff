import axios, { InternalAxiosRequestConfig } from "axios";
import { Url_api } from "../../constants/global";
import { useNavigate } from "react-router-dom";

export const http = axios.create({
  baseURL: Url_api,
});

// const navigate = useNavigate();

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
  if ((err.response.status == 401 || err.response.status == 403) && !window.location.href.includes('login')) {
    window.location.href = '/login?redirect=true'
  }
})
