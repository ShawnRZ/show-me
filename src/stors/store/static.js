import { defineStore } from "pinia";

export const useSpellStore = defineStore("spell", {
  state: () => ({
    spell: new Map(),
  }),
  getters: {
    getSpell: (state) => {
      return state.spell;
    },
  },
  actions: {
    setSpell(newSpell) {
      this.spell = newSpell;
    },
  },
});
export const usePerkStore = defineStore("perk", {
  state: () => ({
    Perk: new Map(),
  }),
  getters: {
    getPerk: (state) => {
      return state.Perk;
    },
  },
  actions: {
    setPerk(newPerk) {
      this.Perk = newPerk;
    },
  },
});
export const useItemStore = defineStore("item", {
  state: () => ({
    Item: new Map(),
  }),
  getters: {
    getItem: (state) => {
      return state.Item;
    },
  },
  actions: {
    setItem(newItem) {
      this.Item = newItem;
    },
  },
});
