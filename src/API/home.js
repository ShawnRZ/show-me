import request from "@/utils/request.js";

/**
 * 获取召唤师信息
 * @param puuid
 * @returns {Promise<unknown>}
 */
export function getSummoner(puuid) {
  return request({
    url: `/lol-summoner/v1/summoners-by-puuid-cached/${puuid}`,
    method: "get",
  });
}

/**
 * 根据puuid获取rank信息
 * @param puuid
 * @returns {Promise<unknown>}
 */
export const getRankStatus = (puuid) => {
  return request({
    url: `/lol-ranked/v1/ranked-stats/${puuid}`,
    method: "get",
  });
};

/**
 * 获取战绩列表
 * @param puuid
 * @param query
 * @returns {Promise<unknown>}
 */
export const getSummonerMatchHistory = (puuid, query) => {
  return request({
    url: `/lol-match-history/v1/products/lol/${puuid}/matches`,
    method: "get",
    query,
  });
};
/**
 * 获取战绩详情
 * @param gameId 游戏id
 * @returns {Promise<unknown>}
 */
export const getMatchDetail = (gameId) => {
  return request({
    url: `/lol-match-history/v1/games/${gameId}`,
    method: "get",
  });
};
