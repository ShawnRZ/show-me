import { invoke } from "@tauri-apps/api";
import { useConfigStore } from "@/stors/store/config.js";

import pinia from "@/stors/pinia.js";

export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
export function getNowDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export function $Message(title, message, type) {
  ElNotification({
    title: title,
    message: message,
    position: "bottom-right",
    type: type,
  });
}
/**
 * 获取连接客户端需要的端口和鉴权token，失败则抛出错误
 *
 */
export function updateCommandLine() {
  return new Promise(async (resolve, reject) => {
    let res = await invoke("get_command_line");
    if (res[0] === "" || res[1] === "") {
      $Message(
        "获取客户端参数失败!",
        "获取客户端参数失败,请重启客户端！",
        "warning"
      );
      reject("获取客户端参数失败,请重启客户端！");
    }
    const configStore = useConfigStore(pinia);
    configStore.setPort(res[1]);
    configStore.setToken(res[0]);
    resolve();
  });
}
