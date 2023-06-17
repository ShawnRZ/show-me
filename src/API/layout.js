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
