import { useItemStore, usePerkStore, useSpellStore } from "@/store/static.js";
import pinia from "@/store/pinia.js";

const spell = useSpellStore(pinia);
const perk = usePerkStore(pinia);
const item = useItemStore(pinia);
let spellMap = await spell.getSpell();
let perkMap = await perk.getPerk();
let itemMap = await item.getItem();
/**
 * 获取召唤师技能图片
 * @param spellId 技能id
 * @returns {string} 技能名称
 */
export function getSpellName(spellId) {
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

 * @returns {string} 符文名称
 */
export function getRunesUrl(id) {
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

 * @returns {string} 装备名称
 */
export function getItemUrl(id) {
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
 * @returns {string}
 */
export function getRuneDetail(id, Vars) {
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
