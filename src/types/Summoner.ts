/**
 * LolSummonerSummoner
 */
export interface Summoner {
    accountId: number;
    displayName: string;
    internalName: string;
    nameChangeFlag: boolean;
    percentCompleteForNextLevel: number;
    privacy: PrivacySetting;
    profileIconId: number;
    puuid: string;
    rerollPoints: RerollPoints;
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