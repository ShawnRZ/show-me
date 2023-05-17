
/**
 * LolMatchHistoryMatchHistoryList
 */
export interface MatchHistory {
    accountId: number;
    games: MatchList;
    platformId: string;
}


/**
 * LolMatchHistoryMatchHistoryGameList
 */
export interface MatchList {
    gameBeginDate: string;
    gameCount: number;
    gameEndDate: string;
    gameIndexBegin: number;
    gameIndexEnd: number;
    games: Match[];
}

/**
 * LolMatchHistoryMatchHistoryGame
 */
export interface Match {
    gameCreation: number;
    gameCreationDate: string;
    gameDuration: number;
    gameId: number;
    gameMode: string;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participantIdentities: Identities[];
    participants: Participant[];
    platformId: string;
    queueId: number;
    seasonId: number;
    teams: Team[];
}

/**
 * LolMatchHistoryMatchHistoryParticipantIdentities
 */
export interface Identities {
    participantId: number;
    player: Player;
}

/**
 * LolMatchHistoryMatchHistoryParticipantIdentityPlayer
 */
export interface Player {
    accountId: number;
    currentAccountId: number;
    currentPlatformId: string;
    matchHistoryUri: string;
    platformId: string;
    profileIcon: number;
    summonerId: number;
    summonerName: string;
}

/**
 * LolMatchHistoryMatchHistoryParticipant
 */
export interface Participant {
    championId: number;
    highestAchievedSeasonTier: string;
    participantId: number;
    spell1Id: number;
    spell2Id: number;
    stats: Statistics;
    teamId: number;
    timeline: Timeline;
}

/**
 * LolMatchHistoryMatchHistoryParticipantStatistics
 */
export interface Statistics {
    assists: number;
    causedEarlySurrender: boolean;
    champLevel: number;
    combatPlayerScore: number;
    damageDealtToObjectives: number;
    damageDealtToTurrets: number;
    damageSelfMitigated: number;
    deaths: number;
    doubleKills: number;
    earlySurrenderAccomplice: boolean;
    firstBloodAssist: boolean;
    firstBloodKill: boolean;
    firstInhibitorAssist: boolean;
    firstInhibitorKill: boolean;
    firstTowerAssist: boolean;
    firstTowerKill: boolean;
    gameEndedInEarlySurrender: boolean;
    gameEndedInSurrender: boolean;
    goldEarned: number;
    goldSpent: number;
    inhibitorKills: number;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
    killingSprees: number;
    kills: number;
    largestCriticalStrike: number;
    largestKillingSpree: number;
    largestMultiKill: number;
    longestTimeSpentLiving: number;
    magicalDamageTaken: number;
    magicDamageDealt: number;
    magicDamageDealtToChampions: number;
    neutralMinionsKilled: number;
    neutralMinionsKilledEnemyJungle: number;
    neutralMinionsKilledTeamJungle: number;
    objectivePlayerScore: number;
    participantId: number;
    pentaKills: number;
    perk0: number;
    perk0Var1: number;
    perk0Var2: number;
    perk0Var3: number;
    perk1: number;
    perk1Var1: number;
    perk1Var2: number;
    perk1Var3: number;
    perk2: number;
    perk2Var1: number;
    perk2Var2: number;
    perk2Var3: number;
    perk3: number;
    perk3Var1: number;
    perk3Var2: number;
    perk3Var3: number;
    perk4: number;
    perk4Var1: number;
    perk4Var2: number;
    perk4Var3: number;
    perk5: number;
    perk5Var1: number;
    perk5Var2: number;
    perk5Var3: number;
    perkPrimaryStyle: number;
    perkSubStyle: number;
    physicalDamageDealt: number;
    physicalDamageDealtToChampions: number;
    physicalDamageTaken: number;
    playerScore0: number;
    playerScore1: number;
    playerScore2: number;
    playerScore3: number;
    playerScore4: number;
    playerScore5: number;
    playerScore6: number;
    playerScore7: number;
    playerScore8: number;
    playerScore9: number;
    quadraKills: number;
    sightWardsBoughtInGame: number;
    teamEarlySurrendered: boolean;
    timeCCingOthers: number;
    totalDamageDealt: number;
    totalDamageDealtToChampions: number;
    totalDamageTaken: number;
    totalHeal: number;
    totalMinionsKilled: number;
    totalPlayerScore: number;
    totalScoreRank: number;
    totalTimeCrowdControlDealt: number;
    totalUnitsHealed: number;
    tripleKills: number;
    trueDamageDealt: number;
    trueDamageDealtToChampions: number;
    trueDamageTaken: number;
    turretKills: number;
    unrealKills: number;
    visionScore: number;
    visionWardsBoughtInGame: number;
    wardsKilled: number;
    wardsPlaced: number;
    win: boolean;
}

/**
 * LolMatchHistoryMatchHistoryTimeline
 */
export interface Timeline {
    creepsPerMinDeltas: { [key: string]: number };
    csDiffPerMinDeltas: { [key: string]: number };
    damageTakenDiffPerMinDeltas: { [key: string]: number };
    damageTakenPerMinDeltas: { [key: string]: number };
    goldPerMinDeltas: { [key: string]: number };
    lane: string;
    participantId: number;
    role: string;
    xpDiffPerMinDeltas: { [key: string]: number };
    xpPerMinDeltas: { [key: string]: number };
}

/**
 * LolMatchHistoryMatchHistoryTeam
 */
export interface Team {
    bans: Ban[];
    baronKills: number;
    dominionVictoryScore: number;
    dragonKills: number;
    firstBaron: boolean;
    firstBlood: boolean;
    firstDargon: boolean;
    firstInhibitor: boolean;
    firstTower: boolean;
    inhibitorKills: number;
    riftHeraldKills: number;
    teamId: number;
    towerKills: number;
    vilemawKills: number;
    win: string;
}

/**
 * LolMatchHistoryMatchHistoryTeamBan
 */
export interface Ban {
    championId: number;
    pickTurn: number;
}
