// src/services/api.js
import axios from "axios";
import config from "../config.js";

// Use environment variable in production, fallback to deployed backend
const baseURL = config.API_BASE_URL;

console.log("API base URL:", baseURL); // Helpful for debugging

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
