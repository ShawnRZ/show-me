import request from "@/utils/request.js";
import { fetch } from "@tauri-apps/api/http";
import { SpellData } from "@/modules/SpellData.js";
import { PerkData } from "@/modules/PerkData.js";
import { ItemData } from "@/modules/ItemData.js";

export const _getSpellUrl = () => {
  return new Promise(async (resolve, reject) => {
    const spellUrl =
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/zh_cn/v1/summoner-spells.json";
    try {
      console.log(`fetch(${spellUrl})`);
      let res = await fetch(spellUrl, {
        method: "GET",
      });
      if (!res.ok) {
        reject(`GET: ${spellUrl}, status: ${res.status}`);
      }
      const map = new Map();
      res.data.forEach((item) => {
        map.set(item.id, new SpellData(item));
      });
      resolve(map);
    } catch (error) {
      reject("spellUrlError:", error);
    }
  });
};
export const _getPerkUrl = () => {
  return new Promise(async (resolve, reject) => {
    const perkUrl =
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/zh_cn/v1/perks.json";
    try {
      console.log(`fetch(${perkUrl})`);
      let res = await fetch(perkUrl, {
        method: "GET",
      });
      if (!res.ok) {
        reject(`GET: ${perkUrl}, status: ${res.status}`);
      }
      const map = new Map();
      res.data.forEach((item) => {
        map.set(item.id, new PerkData(item));
      });
      resolve(map);
    } catch (error) {
      reject("perkUrlError:", error);
    }
  });
};
export const _getItemUrl = () => {
  return new Promise(async (resolve, reject) => {
    const itemUrl =
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/zh_cn/v1/items.json";
    try {
      console.log(`fetch(${itemUrl})`);
      let res = await fetch(itemUrl, {
        method: "GET",
      });
      if (!res.ok) {
        reject(`GET: ${itemUrl}, status: ${res.status}`);
      }
      const map = new Map();
      res.data.forEach((item) => {
        map.set(item.id, new ItemData(item));
      });
      resolve(map);
    } catch (error) {
      reject("itemUrlError:", error);
    }
  });
};
