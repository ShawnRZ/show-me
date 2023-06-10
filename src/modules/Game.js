// export class Game {
//   constructor(data) {
//     this.gameCreation = data.gameCreation;
//     // 对局开始的时间
//     this.gameCreationDate = data.gameCreationDate;
//     // 对局持续的时间，单位秒
//     this.gameDuration = data.gameDuration;
//     // 对局ID
//     this.gameId = data.gameId;
//     // 游戏模式（用不到）
//     this.gameMode = data.gameMode;
//     // 游戏类型（用不到）
//     this.gameType = data.gameType;
//     // 游戏版本
//     this.gameVersion = data.gameVersion;
//     // 地图ID（用不到）
//     this.mapId = data.mapId;
//     // 玩家的身份信息列表
//     this.participantIdentities = data.participantIdentities;
//     // 玩家列表
//     this.participants = data.participants;
//     this.platformId = data.platformId;
//     // 队列ID（通过这个值来获取游戏模式：匹配，排位，大乱斗之类的）
//     this.queueId = data.queueId;
//     this.seasonId = data.seasonId;
//     // 队伍列表，只有红蓝两个队伍
//     // this.teams=Team[];
//   }
// }
import {
  useItemStore,
  usePerkStore,
  useSpellStore,
} from "@/stors/store/static.js";
import {
  $Message,
  getItemUrl,
  getRuneDetail,
  getRunesUrl,
  getSpellName,
} from "@/utils/base.js";
import { _getItemUrl, _getPerkUrl, _getSpellUrl } from "@/API/assets.js";

const spell = useSpellStore();
const perk = usePerkStore();
const item = useItemStore();

export class Game {
  await;
  constructor(data) {
    let spellMap = spell.getSpell;
    let perkMap = perk.getPerk;
    let itemMap = item.getItem;
    if (spellMap === "") {
      Promise.all([_getSpellUrl(), _getPerkUrl(), _getItemUrl()])
        .then((res) => {
          spell.setSpell(res[0]);
          perk.setPerk(res[1]);
          item.setItem(res[2]);
          console.log("静态资源加载成功");
        })
        .catch((e) => {
          $Message("静态资源加载错误！", e, "warning");
        });
    }
    spellMap = spell.getSpell;
    perkMap = perk.getPerk;
    itemMap = item.getItem;
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
      data.participants[0].spell1Id,
      spellMap
    )}.png`;
    //   召唤师技能图片2
    this.spell2 = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${getSpellName(
      data.participants[0].spell2Id,
      spellMap
    )}.png`;
    // 符文0-5name和图片
    let stats = data.participants[0].stats;
    this.perk0 = new Perk(stats.perk0, perkMap);
    this.perk1 = new Perk(stats.perk1, perkMap);
    this.perk2 = new Perk(stats.perk2, perkMap);
    this.perk3 = new Perk(stats.perk3, perkMap);
    this.perk4 = new Perk(stats.perk4, perkMap);
    this.perk5 = new Perk(stats.perk5, perkMap);
    this.perks = [
      this.perk0,
      this.perk1,
      this.perk2,
      this.perk3,
      this.perk4,
      this.perk5,
    ];
    //   装备1-7name和图片
    this.item0 = new Item(stats.item0, itemMap);
    this.item1 = new Item(stats.item1, itemMap);
    this.item2 = new Item(stats.item2, itemMap);
    this.item3 = new Item(stats.item3, itemMap);
    this.item4 = new Item(stats.item4, itemMap);
    this.item5 = new Item(stats.item5, itemMap);
    this.item6 = new Item(stats.item6, itemMap);
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
  constructor(data, perkMap, Vars = []) {
    let o = null;
    if (perkMap.has(data)) {
      o = perkMap.get(data);
    }
    this.perkName = o?.name;
    this.perkIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(
      data,
      perkMap
    )}.png`;
    if (Vars) {
      this.perkDetail = getRuneDetail(data, Vars, perkMap);
    }
  }
}
export class Item {
  constructor(data, itemMap) {
    let o = null;
    if (itemMap.has(data)) {
      o = itemMap.get(data);
    }
    this.itemName = o?.name;
    this.itemIcon = getItemUrl(data, itemMap);
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
