import axios from "axios";

const getDemoAuthHeader = () => {
  if (typeof window === "undefined") return {};
  const demoAuth = window.localStorage.getItem("imessage-demo-auth");
  return demoAuth ? { "x-demo-user-id": "demo-user" } : {};
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = { ...config.headers, ...getDemoAuthHeader() };
  return config;
});
