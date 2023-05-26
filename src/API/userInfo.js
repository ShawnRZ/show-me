import request from "@/utils/request.js";
//
// export function getCurrentSummoner() {
//   // return request.get("/lol-summoner/v1/current-summoner");
//   return axios({
//     url: "/lol-summoner/v1/current-summoner",
//     method: "get",
//   });
// }
export function getCurrentSummoner() {
  // return request.get("/lol-summoner/v1/current-summoner");
  return request({
    url: "/lol-summoner/v1/current-summoner",
    method: "get",
  });
}
