import { invoke } from "@tauri-apps/api";
import { deepCopy } from "@/utils/base.js";
function wrappedInvoke(cmd, data = {}) {
  return new Promise((resolve, reject) => {
    try {
      invoke(cmd, data)
        .then((res) => {
          let value = JSON.parse(String(res) || null);
          console.log(
            `%c[${cmd}] `,
            `color: #4CAF50; font-weight: bold`,
            deepCopy(data) || ""
          );
          console.log(
            `%c[${cmd}] `,
            `color: #03A9F4; font-weight: bold`,
            deepCopy(value)
          );
          resolve(value);
        })
        .catch((e) => {
          reject(e);
        });
    } catch (e) {
      console.log(
        `%c[${cmd}] `,
        `color: #4CAF50; font-weight: bold`,
        deepCopy(data) || ""
      );
      console.log(
        `%c[${cmd}] ${data} `,
        `color: red; font-weight: bold`,
        "网络错误！",
        e
      );
    }
  });
}
export default wrappedInvoke;
