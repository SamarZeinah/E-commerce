// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://ecommerce.routemisr.com/api/v1",
// });

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
});

// ← أضيفي ده
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export default axiosInstance;