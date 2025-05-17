// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ✅ backend URL
  withCredentials: true,                // ✅ enables cookies/auth headers
});

export default api;
