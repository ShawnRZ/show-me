import { invoke } from "@tauri-apps/api";
import { deepCopy } from "@/utils/base.js";
import { SGP_SERVER_LIST } from "@/modules/SGP_SERVER_LIST.js";
import { Summoner } from "@/modules/Summoner.js";
import request from "@/utils/request.js";

/**
 * 根据召唤师名称查询全区
 * @param name
 * @returns {Promise<unknown>}
 */
export function get_summoner_by_name(name) {
  console.log(
    `%c[get_summoner_by_name] `,
    `color: #4CAF50; font-weight: bold`,
    deepCopy(name) || ""
  );
  let promiseList = SGP_SERVER_LIST.map((item) => {
    let data = {
      name: name,
      region: item.region,
    };
    let p = new Promise((resolve, reject) => {
      invoke("get_summoner_by_name", data)
        .then((res1) => {
          let value1 = JSON.parse(String(res1) || null);
          if (value1) {
            let params = {
              puuid: value1.puuid,
              region: item.region,
            };
            invoke("get_ranked_stats_by_puuid", params)
              .then((res2) => {
                let value2 = JSON.parse(String(res2) || null);
                let result = {
                  summoner: value1,
                  ranked: value2,
                  server: item,
                };
                resolve(result);
              })
              .catch((e) => {
                reject(`${data.name} 召唤师的ranked不存在`);
              });
          }
        })
        .catch((e) => {
          reject(`${data.name} 召唤师不存在`);
        });
    });
    return p;
  });

  let result = [];
  return new Promise(async (resolve, reject) => {
    await Promise.allSettled(promiseList)
      .then((res) => {
        result = res
          .filter((item) => {
            return item.value !== undefined;
          })
          .map((item) => {
            return item.value;
          });
        console.log(
          `%c[get_summoner_by_name] `,
          `color: #03A9F4; font-weight: bold`,
          deepCopy(result)
        );
        resolve(result);
      })
      .catch((e) => {
        // 所有请求被拒绝
        console.log(e);
        reject(e);
      });
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
 * 根据summonerId获取召唤师详情
 * @param id
 * @returns {Promise<unknown>}
 */
export function getSummonerById(id) {
  return request({
    url: `/lol-summoner/v1/summoners/${id}`,
    method: "get",
  });
}
