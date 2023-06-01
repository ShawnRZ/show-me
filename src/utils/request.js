// 请求拦截器
import { useConfigStore } from "@/stors/store/config.js";

import pinia from "@/stors/pinia.js";
import { deepCopy, getNowDate } from "@/utils/base.js";
import { fetch } from "@tauri-apps/api/http";

async function request(option) {
  return new Promise(async (resolve, reject) => {
    const { url, method, query = {} } = option;
    let oldDate = getNowDate();
    console.log(
      `%c[${method}] ${url} ${oldDate} `,
      `color: #4CAF50; font-weight: bold`,
      deepCopy(query) || ""
    );
    let res;
    const configStore = useConfigStore(pinia);
    let port = configStore.getPort;
    let token = configStore.getToken;
    try {
      res = await fetch(`https://127.0.0.1:${port}${url}`, {
        method: method,
        headers: {
          Authorization: `Basic ${btoa(`riot:${token}`)} `,
        },
        query,
      });
    } catch (err) {
      console.log(
        `%c[${method}] ${url} `,
        `color: red; font-weight: bold`,
        "网络错误！",
        err
      );
      reject(err);
    }
    if (!res.ok) {
      console.log(
        `%c[${method}] ${url} `,
        `color: red; font-weight: bold`,
        "请求参数错误",
        deepCopy(query) || "",
        res
      );
      reject(res);
    }
    let nowDate = getNowDate();
    console.log(
      `%c[${method}] ${url} ${nowDate}s`,
      `color: #03A9F4; font-weight: bold`,
      deepCopy(res.data)
    );
    resolve(res.data);
  });
}
export default request;
