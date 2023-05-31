import request from "@/utils/request.js";
export function getSummoner(puuid) {
  return request({
    url: `/lol-summoner/v1/summoners-by-puuid-cached/${puuid}`,
    method: "get",
  });
}

export const getRankStatus = (puuid) => {
  return request({
    url: `/lol-ranked/v1/ranked-stats/${puuid}`,
    method: "get",
  });
};
export const getSummonerMatchHistory = (puuid, query) => {
  return request({
    url: `/lol-match-history/v1/products/lol/${puuid}/matches`,
    method: "get",
    query,
  });
};
