import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Match } from "@/types/Match";

export const useMatchDetail = defineStore("matchDetail", () => {
  const detail: Ref<Match | null> = ref(null);
  return { detail };
});
