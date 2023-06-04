import request from "@/utils/request.js";

/**
 * 获取当前召唤师信息
 * @returns {Promise<unknown>}
 */
export function getCurrentSummoner() {
  // return request.get("/lol-summoner/v1/current-summoner");
  return request({
    url: "/lol-summoner/v1/current-summoner",
    method: "get",
  });
}

/**
 * 根据昵称获取召唤师信息
 * @param query
 * @returns {Promise<unknown>}
 */
export function getQuerySummoner(query) {
  return request({
    url: "/lol-summoner/v1/summoners",
    method: "get",
    query,
  });
}

/**
 * 获取战绩详情
 * @param gameId
 * @returns {Promise<unknown>}
 */
export function queryMatchDetail(gameId) {
  return request({
    url: `/lol-match-history/v1/games/${gameId}`,
    method: "get",
  });
}
