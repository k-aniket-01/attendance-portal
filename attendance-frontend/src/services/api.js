import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

/* 🔐 REQUEST INTERCEPTOR (attach token) */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

/* 🚨 RESPONSE INTERCEPTOR (handle expiry) */
API.interceptors.response.use(
  (res) => res,
  (err) => {

    // 🔥 If token expired or unauthorized
    if (err.response?.status === 401) {
      alert("Session expired. Please login again.");

      localStorage.removeItem("token");

      // redirect to login
      window.location.href = "/";
    }

    return Promise.reject(err);
  }
);

export default API;