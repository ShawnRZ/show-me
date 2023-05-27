import { Summoner } from "@/modules/Summoner.js";
import { defineStore } from "pinia";
export const useCurrentSummonerStore = defineStore("Summoner", {
  state: () => ({
    Summoner: null,
  }),
  getters: {
    getSummoner: (state) => {
      return state.Summoner;
    },
  },
  actions: {
    setSummoner(summoner) {
      this.Summoner = new Summoner(summoner);
    },
  },
});
export const queryCurrentSummonerStore = defineStore("Summoner", {
  state: () => ({
    Summoner: null,
  }),
  getters: {
    getSummoner: (state) => {
      return state.Summoner;
    },
  },
  actions: {
    setSummoner(summoner) {
      this.Summoner = new Summoner(summoner);
    },
  },
});
