import request from "@/utils/request.js";
export const getRankStatus = (puuid) => {
  return request({
    url: `/lol-ranked/v1/ranked-stats/${puuid}`,
    method: "get",
  });
};
