import axios from "axios";
import { deepCopy, getNowDate } from "@/utils/base.js";
import { getPort, getToken } from "@/localStorage/config.js";

const instance = axios.create({
  baseURL: `https://127.0.0.1:${getPort()}`,
  timeout: 600000,
});

// 设置请求拦截器
instance.interceptors.request.use(
  (config) => {
    console.log(config);
    // 在请求发送前可以进行一些处理，例如添加请求头等
    config.headers.Authorization = `Basic ${btoa(`riot:${getToken()}`)} `;

    // API可视化
    console.log(
      `%c[${config.method}] ${config.url} ${getNowDate()}`,
      `color: #4CAF50; font-weight: bold`,
      config.data ? deepCopy(config.data) : ""
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//设置响应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log(5);
    const res = response.data;
    console.log(
      `%c[${response.config.method}] ${response.config.url}  s`,
      `color: #03A9F4; font-weight: bold`,
      deepCopy(res)
    );
    if (res.ok) {
      return Promise.resolve(deepCopy(res.data));
    }
    return Promise.reject(`status:${res.status}`);
  },
  (e) => {
    return Promise.reject(e);
  }
);
export default instance;
