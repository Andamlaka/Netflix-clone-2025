// src/utils/api.js
import axios from "axios";

// ✅ Log the base URL
console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // ✅ This should now match the log above
  withCredentials: true,                       // ✅ Sends cookies/session info
});

export default api;
