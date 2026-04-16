import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true, // send cookies if your backend uses them
  timeout: 10000,
});

/* 🔐 REQUEST INTERCEPTOR */
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err) => Promise.reject(err) // ← you were missing request error handling
);

/* 🚨 RESPONSE INTERCEPTOR */
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // 🔄 Token refresh (attempt once, don't loop)
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/refresh/`,
          { refresh: refreshToken }
        );

        localStorage.setItem("token", data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;

        return API(originalRequest); // retry the failed request
      } catch (refreshErr) {
        // Refresh also failed — force logout
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
        return Promise.reject(refreshErr);
      }
    }

    // 🚫 403 — authenticated but not authorized
    if (err.response?.status === 403) {
      window.location.href = "/forbidden";
    }

    // ❌ Network error (no response at all)
    if (!err.response) {
      console.error("Network error:", err.message);
      // optionally show a toast notification here
    }

    return Promise.reject(err);
  }
);

export default API;