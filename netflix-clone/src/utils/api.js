// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // ✅ Now dynamic
  withCredentials: true,                       // ✅ Keeps cookies/session
});

export default api;
