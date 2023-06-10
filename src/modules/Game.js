import { useItemStore, usePerkStore, useSpellStore } from "@/store/static.js";
import {
  getItemUrl,
  getRuneDetail,
  getRunesUrl,
  getSpellName,
} from "@/utils/getImgUrl.js";
const perk = usePerkStore();
const item = useItemStore();
let perkMap = await perk.getPerk();
let itemMap = await item.getItem();

export class Game {
  constructor(data) {
    this.gameId = data.gameId;
    // 是否胜利
    this.win = data.participants[0].stats.win;
    // 游戏类型
    this.gameType = switchGameType[data.queueId];
    //   游戏距离时间
    this.timeStamp = timeStamp[data.gameCreation];
    // 游戏时间
    this.duration = `${Math.floor(data.gameDuration / 60)}分${Math.floor(
      data.gameDuration % 60
    )}秒 `;
    //   英雄图片
    this.championIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${data.participants[0].championId}.png`;
    //   等级
    this.champLevel = data.participants[0].stats.champLevel;
    //   召唤师技能图片1
    this.spell1 = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${getSpellName(
      data.participants[0].spell1Id
    )}.png`;
    //   召唤师技能图片2
    this.spell2 = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${getSpellName(
      data.participants[0].spell2Id
    )}.png`;
    // 符文0-5name和图片
    let stats = data.participants[0].stats;
    this.perk0 = new Perk(stats.perk0);
    this.perk1 = new Perk(stats.perk1);
    this.perk2 = new Perk(stats.perk2);
    this.perk3 = new Perk(stats.perk3);
    this.perk4 = new Perk(stats.perk4);
    this.perk5 = new Perk(stats.perk5);
    this.perks = [
      this.perk0,
      this.perk1,
      this.perk2,
      this.perk3,
      this.perk4,
      this.perk5,
    ];
    //   装备1-7name和图片
    this.item0 = new Item(stats.item0);
    this.item1 = new Item(stats.item1);
    this.item2 = new Item(stats.item2);
    this.item3 = new Item(stats.item3);
    this.item4 = new Item(stats.item4);
    this.item5 = new Item(stats.item5);
    this.item6 = new Item(stats.item6);
    this.items = [
      this.item0,
      this.item1,
      this.item2,
      this.item3,
      this.item4,
      this.item5,
      this.item6,
    ];
    //   KDA
    this.kills = stats.kills;
    this.assists = stats.assists;
    this.deaths = stats.deaths;
    //   经济
    this.goldEarned = stats.goldEarned;
    this.totalMinionsKilled = stats.totalMinionsKilled;
    //   总伤害
    this.totalDamageDealtToChampions = stats.totalDamageDealtToChampions;
  }
}
export class Perk {
  constructor(data, Vars = []) {
    let o = null;
    if (perkMap.has(data)) {
      o = perkMap.get(data);
    }
    this.perkName = o?.name;
    this.perkIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(
      data
    )}.png`;
    if (Vars) {
      this.perkDetail = getRuneDetail(data, Vars);
    }
  }
}
export class Item {
  constructor(data) {
    let o = null;
    if (itemMap.has(data)) {
      o = itemMap.get(data);
    }
    this.itemName = o?.name;
    this.itemIcon = getItemUrl(data);
  }
}
const switchGameType = {
  430: "匹配模式",
  420: "单排/双排",
  440: "灵活排位",
  450: "极地大乱斗",
  700: "冠军杯赛",
  840: "新手",
  830: "一般",
  1900: "无限火力",
};
export const timeStamp = (gameCreation) => {
  const now = new Date().getTime();
  const stamp = now - gameCreation;
  if (stamp >= 31536000000) {
    return `${Math.floor(stamp / 31536000000)}年前`;
  } else if (stamp >= 2592000000) {
    return `${Math.floor(stamp / 2592000000)}月前`;
  } else if (stamp >= 604800000) {
    return `${Math.floor(stamp / 604800000)}周前`;
  } else if (stamp >= 86400000) {
    return `${Math.floor(stamp / 86400000)}天前`;
  } else if (stamp >= 3600000) {
    return `${Math.floor(stamp / 3600000)}小时前`;
  } else if (stamp >= 60000) {
    return `${Math.floor(stamp / 60000)}分钟前`;
  } else {
    return `${Math.floor(stamp / 1000)}秒前`;
  }
  return "";
};
