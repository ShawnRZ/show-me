import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfigStore = defineStore("config", () => {
  const port = ref("");
  const token = ref("");
  const ready = ref(false);

  return { port, token, ready };
});
