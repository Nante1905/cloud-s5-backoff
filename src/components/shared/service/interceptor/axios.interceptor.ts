import axios, { InternalAxiosRequestConfig } from "axios";

export const http = axios.create({
  baseURL: "http://localhost:8080",
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
