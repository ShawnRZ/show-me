import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", {
  state: () => ({
    port: "",
    token: "",
    isReady: false,
  }),
  getters: {
    getPort: (state) => {
      return state.port;
    },
    getToken: (state) => {
      return state.token;
    },
    getIsReady: (state) => {
      return state.isReady;
    },
  },
  actions: {
    setPort(newPort) {
      this.port = newPort;
    },
    setToken(newToken) {
      this.token = newToken;
    },
    setIsReady(value) {
      this.isReady = value;
    },
  },
});
