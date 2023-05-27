import { Summoner } from "@/modules/Summoner.js";

/**
 * 保存 CurrentSummoner 到 localStorage
 * @param {Summoner} currentSummoner
 */
export const setCurrentSummonerStorage = (currentSummoner) => {
  const summoner = new Summoner(currentSummoner);
  localStorage.setItem("currentSummoner", JSON.stringify(summoner));
};
/**
 * 保存 QuerySummoner 到 localStorage
 * @param {Summoner} querySummoner
 */
export const setQuerySummonerStorage = (querySummoner) => {
  const summoner = new Summoner(querySummoner);
  localStorage.setItem("querySummoner", JSON.stringify(summoner));
};
/**
 * 从 localStorage 中返回 currentSummoner
 * @returns {string}
 */
export const getCurrentSummonerStorage = () => {
  return JSON.parse(localStorage.getItem("currentSummoner")) || {};
};
/**
 * 从 localStorage 中返回 querySummoner
 * @returns {string}
 */
export const getQuerySummonerStorage = () => {
  return JSON.parse(localStorage.getItem("querySummoner")) || {};
};
