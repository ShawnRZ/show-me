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

/**
 * 获取召唤师技能图片
 * @param spellId 技能id
 * @param spellMap 技能Map对象
 * @returns {string} 技能名称
 */
export function getSpellName(spellId, spellMap) {
  const regex = new RegExp("Icons2D/(.*).png", "gm");
  let o = null;
  if (spellMap.has(spellId)) {
    o = spellMap.get(spellId);
  }

  let url = "";
  if (!o) {
    return "summoner_empty";
  }
  url = o.iconPath;
  let m = regex.exec(url);
  if (!m) {
    return "summoner_empty";
  }
  return m[1].toLocaleLowerCase();
}

/**
 * 获取符文图片
 * @param id 符文id
 * @param perkMap 符文Map
 * @returns {string} 符文名称
 */
export function getRunesUrl(id, perkMap) {
  const regex = new RegExp("Styles/(.*).png", "gm");
  let o = null;
  if (perkMap.has(id)) {
    o = perkMap.get(id);
  }
  if (!o) {
    return "runesicon";
  }
  let url = o.iconPath;
  let m = regex.exec(url);
  if (!m) {
    return "runesicon";
  }
  return m[1].toLocaleLowerCase();
}

/**
 * 获取装备图片
 * @param id 装备id
 * @param itemMap 装备Map
 * @returns {string} 装备名称
 */
export function getItemUrl(id, itemMap) {
  let str = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/gp_ui_placeholder.png`;
  if (id === 0) {
    return str;
  }
  const regex = new RegExp("Icons2D/(.*).png", "gm");
  let o = null;
  if (itemMap.has(id)) {
    o = itemMap.get(id);
  }
  if (!o) {
    return str;
  }
  let url = o.iconPath;
  let m = regex.exec(url);
  if (!m) {
    return str;
  }
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${m[1].toLocaleLowerCase()}.png`;
}

/**
 * 获取符文详情
 * @param id
 * @param Vars
 * @param perkMap
 * @returns {string}
 */
export function getRuneDetail(id, Vars, perkMap) {
  let detail = "";
  let rune = perkMap.get(id);
  if (!rune) {
    return detail;
  }
  for (let i = 0; i < rune.endOfGameStatDescs.length; i++) {
    detail += rune.endOfGameStatDescs[i];
    detail += "<br />";
  }
  Vars.forEach((item, index) => {
    detail = detail.replace(`@eogvar${index + 1}@`, item.toString());
  });
  return detail;
}
