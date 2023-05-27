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
    setSummoner(Summoner) {
      this.Summoner = Summoner;
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
    setSummoner(Summoner) {
      this.Summoner = Summoner;
    },
  },
});
