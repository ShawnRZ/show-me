/**
 * LolSummonerSummoner
 */
export interface Summoner {
    accountId: number;

    // 玩家昵称
    displayName: string;
    internalName: string;
    nameChangeFlag: boolean;
    percentCompleteForNextLevel: number;
    // 玩家资料的公开性
    privacy: PrivacySetting;

    // 召唤师头像ID
    profileIconId: number;

    // 玩家PUUID，全球唯一
    puuid: string;

    // 大乱斗的骰子信息,只有获取自己的数据参数真实的,其他人的数据都是假数据
    rerollPoints: RerollPoints;

    // 同accountId
    summonerId: number;
    // 玩家等级
    summonerLevel: number;
    unnamed: boolean;
    // 当前经验值
    xpSinceLastLevel: number;
    // 升级还需要的经验值
    xpUntilNextLevel: number;
}

/**
 * LolSummonerProfilePrivacySetting
 */
export type PrivacySetting = "PRIVATE" | "PUBLIC";

/**
 * LolSummonerSummonerRerollPoints
 */
export interface RerollPoints {
    // 当前的骰子数
    currentPoints: number;
    maxRolls: number;
    numberOfRolls: number;
    pointsCostToRoll: number;
    pointsToReroll: number;
}