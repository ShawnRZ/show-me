export class Summoner {
  constructor(data) {
    this.accountId = data.accountId;

    // 玩家昵称
    this.displayName = data.displayName;
    this.internalName = data.internalName;
    this.nameChangeFlag = data.nameChangeFlag;
    this.percentCompleteForNextLevel = data.percentCompleteForNextLevel;
    // 玩家资料的公开性
    this.privacy = data.privacy;

    // 召唤师头像ID
    this.profileIconId = data.profileIconId;

    // 玩家PUUID，全球唯一
    this.puuid = data.puuid;

    // 大乱斗的骰子信息,只有获取自己的数据参数真实的,其他人的数据都是假数据
    this.rerollPoints = data.rerollPoints;

    // 同accountId
    this.summonerId = data.summonerId;
    // 玩家等级
    this.summonerLevel = data.summonerLevel;
    this.unnamed = data.unnamed;
    // 当前经验值
    this.xpSinceLastLevel = data.xpSinceLastLevel;
    // 升级还需要的经验值
    this.xpUntilNextLevel = data.xpUntilNextLevel;
  }
}
