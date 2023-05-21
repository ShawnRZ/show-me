/**
 * LolRankedRankedStats
 */
export interface RankedStats {
    earnedRegaliaRewardIds: string[];
    // 当前赛季达到的最高段位,SR代表召唤师峡谷(Summoner Rift)
    highestCurrentSeasonReachedTierSR: LeagueTier;
    highestPreviousSeasonAchievedDivision: Division;
    highestPreviousSeasonAchievedTier: LeagueTier;
    highestPreviousSeasonEndDivision: Division;
    highestPreviousSeasonEndTier: LeagueTier;
    highestRankedEntry: Stats;
    highestRankedEntrySR: Stats;
    queueMap: { [key: string]: Stats };
    queues: Stats[];
    rankedRegaliaLevel: number;
    seasons: { [key: string]: SeasonDTO };
    splitsProgress: { [key: string]: number };
}

/**
 * LolRankedLeagueDivision
 */
export type Division = "I" | "II" | "III" | "IV" | "V" | "NA";

/**
 * LolRankedLeagueTier
 */
export type LeagueTier = "NONE" | "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND" | "MASTER" | "GRANDMASTER" | "CHALLENGER";

/**
 * LolRankedRankedQueueStats
 */
export interface Stats {
    division: Division;
    highestDivision: Division;
    highestTier: LeagueTier;
    isProvisional: boolean;
    leaguePoints: number;
    losses: number;
    miniSeriesProgress: string;
    previousSeasonAchievedDivision: Division;
    previousSeasonAchievedTier: LeagueTier;
    previousSeasonEndDivision: Division;
    previousSeasonEndTier: LeagueTier;
    provisionalGamesRemaining: number;
    provisionalGameThreshold: number;
    queueType: QueueType;
    ratedRating: number;
    ratedTier: RatedTier;
    tier: LeagueTier;
    warnings: QueueWarnings | null;
    wins: number;
}

/**
 * LolRankedLeagueQueueType
 */
export type QueueType = "RANKED_TFT_DOUBLE_UP" | "NONE" | "RANKED_SOLO_5x5" | "RANKED_FLEX_SR" | "RANKED_FLEX_TT" | "RANKED_TFT" | "RANKED_TFT_TURBO" | "RANKED_TFT_PAIRS";

/**
 * LolRankedRatedTier
 */
export type RatedTier = "NONE" | "GRAY" | "GREEN" | "BLUE" | "PURPLE" | "ORANGE";

/**
 * LolRankedRankedQueueWarnings
 */
export interface QueueWarnings {
    daysUntilDecay: number;
    demotionWarning: number;
    displayDecayWarning: boolean;
    timeUntilInactivityStatusChanges: number;
}

/**
 * LolRankedSeasonDTO
 */
export interface SeasonDTO {
    currentSeasonEnd: number;
    currentSeasonId: number;
    nextSeasonStart: number;
}