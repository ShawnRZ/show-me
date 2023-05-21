
/**
 * LolMatchHistoryMatchHistoryList
 * 对局列表
 */
export interface MatchHistory {
    // 对局列表所属玩家的ID
    accountId: number;
    // 对局列表
    games: MatchList;
    platformId: string;
}


/**
 * LolMatchHistoryMatchHistoryGameList
 */
export interface MatchList {
    gameBeginDate: string;

    // 可查询的对局数
    gameCount: number;

    gameEndDate: string;

    // 第一个对局序号
    gameIndexBegin: number;

    // 最后一个对局序号
    gameIndexEnd: number;

    // 对局列表
    games: Match[];
}

/**
 * LolMatchHistoryMatchHistoryGame
 */
export interface Match {
    // 对局开始的时间戳
    gameCreation: number;
    // 对局开始的时间
    gameCreationDate: string;
    // 对局持续的时间，单位秒
    gameDuration: number;
    // 对局ID
    gameId: number;
    // 游戏模式（用不到）
    gameMode: string;
    // 游戏类型（用不到）
    gameType: string;
    // 游戏版本
    gameVersion: string;
    // 地图ID（用不到）
    mapId: number;
    // 玩家的身份信息列表
    participantIdentities: Identities[];
    // 玩家列表
    participants: Participant[];
    platformId: string;
    // 队列ID（通过这个值来获取游戏模式：匹配，排位，大乱斗之类的）
    queueId: number;
    seasonId: number;
    // 队伍列表，只有红蓝两个队伍
    teams: Team[];
}

/**
 * LolMatchHistoryMatchHistoryParticipantIdentities
 */
export interface Identities {
    // 对局参与者ID，0~9
    participantId: number;
    // 玩家信息
    player: Player;
}

/**
 * LolMatchHistoryMatchHistoryParticipantIdentityPlayer
 */
export interface Player {
    // 玩家ID
    accountId: number;
    currentAccountId: number;
    currentPlatformId: string;
    matchHistoryUri: string;
    platformId: string;
    // 召唤师图标的ID
    profileIcon: number;
    // 召唤师ID，一般和accountId相同
    summonerId: number;
    // 召唤师名字
    summonerName: string;
}

/**
 * LolMatchHistoryMatchHistoryParticipant
 */
export interface Participant {
    // 使用的英雄ID
    championId: number;
    // 
    highestAchievedSeasonTier: string;
    // 参与者ID，0~9
    participantId: number;
    // 召唤术技能1ID
    spell1Id: number;
    // 召唤师技能2ID
    spell2Id: number;
    // 统计信息
    stats: Statistics;
    // 所属队伍ID
    teamId: number;
    // 玩家时间线（数据量庞大，暂时用不到）
    timeline: Timeline;
}

/**
 * LolMatchHistoryMatchHistoryParticipantStatistics
 */
export interface Statistics {
    // 助攻数
    assists: number;
    causedEarlySurrender: boolean;
    // 结束时，英雄的等级
    champLevel: number;

    combatPlayerScore: number;
    damageDealtToObjectives: number;
    damageDealtToTurrets: number;
    damageSelfMitigated: number;
    // 死亡数
    deaths: number;
    // 双杀数
    doubleKills: number;
    earlySurrenderAccomplice: boolean;
    // 一血助攻
    firstBloodAssist: boolean;
    // 一血
    firstBloodKill: boolean;
    firstInhibitorAssist: boolean;
    firstInhibitorKill: boolean;
    firstTowerAssist: boolean;
    firstTowerKill: boolean;

    // 提前投降结束的游戏
    gameEndedInEarlySurrender: boolean;
    // 投降结束的游戏
    gameEndedInSurrender: boolean;
    // 获取的金币
    goldEarned: number;
    // 花费的金币
    goldSpent: number;
    inhibitorKills: number;
    // 6件装备的ID
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    // 饰品的ID
    item6: number;
    // 大杀特杀的次数
    killingSprees: number;
    // 击杀数
    kills: number;
    largestCriticalStrike: number;
    largestKillingSpree: number;
    largestMultiKill: number;
    longestTimeSpentLiving: number;

    magicalDamageTaken: number;
    magicDamageDealt: number;
    // 对英雄的魔法伤害
    magicDamageDealtToChampions: number;
    neutralMinionsKilled: number;
    neutralMinionsKilledEnemyJungle: number;
    neutralMinionsKilledTeamJungle: number;
    objectivePlayerScore: number;
    // 参与者ID,0~9
    participantId: number;
    // 五杀数
    pentaKills: number;
    /**
     * perk0~perk5: 携带的5个符文ID
     * perkXVarY: 第X个符文的第Y个统计数值,比如造成了多少伤害,持续了多长时间 
     */
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
    // 四杀数
    quadraKills: number;
    sightWardsBoughtInGame: number;
    teamEarlySurrendered: boolean;
    timeCCingOthers: number;
    totalDamageDealt: number;
    // 对英雄造成总伤害
    totalDamageDealtToChampions: number;
    totalDamageTaken: number;
    totalHeal: number;
    // 补兵数
    totalMinionsKilled: number;
    totalPlayerScore: number;
    totalScoreRank: number;
    totalTimeCrowdControlDealt: number;
    totalUnitsHealed: number;
    // 三杀数
    tripleKills: number;
    trueDamageDealt: number;
    // 对英雄造成真实伤害
    trueDamageDealtToChampions: number;
    trueDamageTaken: number;
    turretKills: number;
    unrealKills: number;
    visionScore: number;
    visionWardsBoughtInGame: number;
    wardsKilled: number;
    wardsPlaced: number;
    // 是否赢得对局
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
    // 队伍的Ban人
    bans: Ban[];
    // 大龙击杀数
    baronKills: number;
    dominionVictoryScore: number;
    // 小龙击杀数
    dragonKills: number;
    // 是否击杀第一条大龙
    firstBaron: boolean;
    // 是否获得一血
    firstBlood: boolean;
    // 是否击杀第一条小龙
    firstDargon: boolean;
    firstInhibitor: boolean;
    // 是否摧毁一塔
    firstTower: boolean;
    inhibitorKills: number;
    riftHeraldKills: number;
    // 队伍的ID,只有 100 和 200
    teamId: number;
    // 推塔数
    towerKills: number;
    vilemawKills: number;
    // 是否赢得对局
    win: string;
}

/**
 * LolMatchHistoryMatchHistoryTeamBan
 */
export interface Ban {
    // ban的英雄ID
    championId: number;
    // ban的次序
    pickTurn: number;
}
