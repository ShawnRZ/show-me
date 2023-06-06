// export interface Match {
//   // 对局开始的时间戳
//   gameCreation: number;
//   // 对局开始的时间
//   gameCreationDate: string;
//   // 对局持续的时间，单位秒
//   gameDuration: number;
//   // 对局ID
//   gameId: number;
//   // 游戏模式（用不到）
//   gameMode: string;
//   // 游戏类型（用不到）
//   gameType: string;
//   // 游戏版本
//   gameVersion: string;
//   // 地图ID（用不到）
//   mapId: number;
//   // 玩家的身份信息列表
//   participantIdentities: Identities[];
//   // 玩家列表
//   participants: Participant[];
//   platformId: string;
//   // 队列ID（通过这个值来获取游戏模式：匹配，排位，大乱斗之类的）
//   queueId: number;
//   seasonId: number;
//   // 队伍列表，只有红蓝两个队伍
//   teams: Team[];
// }

import { getSpellName } from "@/utils/base.js";
import { Item, Perk } from "@/modules/Game.js";
import {
  useItemStore,
  usePerkStore,
  useSpellStore,
} from "@/stors/store/static.js";
const spell = useSpellStore();
const perk = usePerkStore();
const item = useItemStore();

export class Match {
  constructor(data) {
    let spellMap = spell.getSpell;
    let perkMap = perk.getPerk;
    let itemMap = item.getItem;
    console.log(spellMap);
    // 对局开始的时间戳
    this.gameCreation = data.gameCreation;
    // 对局开始的时间
    this.gameCreationDate = data.gameCreationDate;
    // 对局持续的时间，单位秒
    this.gameDuration = data.gameDuration;
    // 对局ID
    this.gameId = data.gameId;
    // 游戏模式（用不到）
    this.gameMode = data.gameMode;
    // 游戏类型（用不到）
    this.gameType = data.gameType;
    // 游戏版本
    this.gameVersion = data.gameVersion;
    // 地图ID（用不到）
    this.mapId = data.mapId;
    // 玩家列表
    this.participants = data.participants;
    // 玩家的身份信息列表
    this.participantIdentities = data.participantIdentities;

    this.platformId = data.platformId;
    // 队列ID（通过这个值来获取游戏模式：匹配，排位，大乱斗之类的）
    this.queueId = data.queueId;
    this.seasonId = data.seasonId;
    // 队伍列表，只有红蓝两个队伍
    this.teams = data.teams;
    this.player = data.participants.map((participants, index) => {
      return new Player(
        participants,
        data.participantIdentities[index],
        spellMap,
        perkMap,
        itemMap
      );
    });
  }
}
export class Player {
  constructor(participants, participantIdentities, spellMap, perkMap, itemMap) {
    // participants=data.participants[i]
    // participantIdentities=data.participantIdentities[i]
    // 英雄图片
    this.champIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${participants.championId}.png`;
    // 英雄等级
    this.champLevel = participants.stats.champLevel;
    //召唤师技能
    this.spell1 = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${getSpellName(
      participants.spell1Id,
      spellMap
    )}.png`;
    this.spell2 = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${getSpellName(
      participants.spell2Id,
      spellMap
    )}.png`;
    //召唤师名称
    this.summonerName = participantIdentities.player.summonerName;
    //   符文
    let stats = participants.stats;
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
    //   符文简介
    // this.perkDetail
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
  }
}
