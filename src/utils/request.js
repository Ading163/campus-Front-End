import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:3000', // 你自己的后端地址
  timeout: 10000,
});

// ✅ 请求拦截器：自动携带 token
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：统一返回完整的后端响应结构
service.interceptors.response.use(
  (response) => {
    // 假设后端返回结构为：{ code, message, data }
    return response.data;
  },
  (error) => {
    // 处理 HTTP 错误响应（如 400、500 等）
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    // 无 response 的网络错误等
    return Promise.reject({
      code: 500,
      message: '网络错误，请稍后重试',
    });
  }
);

export default service;
