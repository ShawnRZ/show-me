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
    privacy: PrivacySetting;

    // 召唤师头像ID
    profileIconId: number;

    // 玩家PUUID，全球唯一
    puuid: string;
    rerollPoints: RerollPoints;

    // 同accountId
    summonerId: number;
    summonerLevel: number;
    unnamed: boolean;
    xpSinceLastLevel: number;
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
    currentPoints: number;
    maxRolls: number;
    numberOfRolls: number;
    pointsCostToRoll: number;
    pointsToReroll: number;
}