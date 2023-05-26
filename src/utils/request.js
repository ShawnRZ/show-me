// 请求拦截器
import { getPort, getToken } from "@/localStorage/config.js";
import { deepCopy, getNowDate } from "@/utils/base.js";
import { fetch } from "@tauri-apps/api/http";

async function request(option) {
  return new Promise(async (resolve, reject) => {
    const { url, method } = option;
    let oldDate = getNowDate();
    console.log(
      `%c[${method}] ${url} ${oldDate}`,
      `color: #4CAF50; font-weight: bold`
    );
    let res;
    try {
      res = await fetch(`https://127.0.0.1:${getPort()}${url}`, {
        method: method,
        headers: {
          Authorization: `Basic ${btoa(`riot:${getToken()}`)} `,
        },
      });
    } catch (err) {
      reject(err);
    }
    if (!res.ok) {
      reject(res.status);
    }
    let nowDate = getNowDate();
    console.log(
      `%c[${method}] ${url} ${nowDate}s`,
      `color: #03A9F4; font-weight: bold`,
      deepCopy(res)
    );
    console.log(res);
    resolve(res.data);
  });
}

export default request;
