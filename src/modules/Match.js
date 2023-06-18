import { Item, Perk } from "@/modules/Game.js";
import { getSpellName } from "@/utils/getImgUrl.js";
export class Match {
  constructor(data) {
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
      return new Player(participants, data.participantIdentities[index]);
    });
  }
}
export class Player {
  constructor(participants, participantIdentities) {
    // participants=data.participants[i]
    // participantIdentities=data.participantIdentities[i]
    // 英雄图片
    this.champIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${participants.championId}.png`;
    // 英雄等级
    this.champLevel = participants.stats.champLevel;
    //召唤师技能
    this.spell1 = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${getSpellName(
      participants.spell1Id
    )}.png`;
    this.spell2 = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${getSpellName(
      participants.spell2Id
    )}.png`;
    //召唤师名称
    this.summonerName = participantIdentities.player.summonerName;
    // summonerID
    this.summonerId = participantIdentities.player.summonerId;
    // 服务器id
    this.platformId = participantIdentities.player.platformId;
    //   符文
    let stats = participants.stats;
    this.perks = [];
    for (let i = 0; i < 6; i++) {
      // this.perk0 = new Perk(stats.perk0, perkMap);
      let Vars = [
        stats["perk" + i + "Var1"],
        stats["perk" + i + "Var2"],
        stats["perk" + i + "Var3"],
      ];
      this["perk" + i] = new Perk(stats["perk" + i], Vars);
      this.perks.push(this["perk" + i]);
    }
    //   装备1-7name和图片
    this.items = [];
    for (let i = 0; i < 7; i++) {
      // this.item0 = new Item(stats.item0, itemMap);
      this["item" + i] = new Item(stats["item" + i]);
      this.items.push(this["item" + i]);
    }
  }
}
