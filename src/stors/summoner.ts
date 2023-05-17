import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Summoner } from "../types/Summoner";


export const useSummonerStore = defineStore("summoner", () => {
    const currentSummoner: Ref<Summoner | null> = ref(null)
    const querySummoner: Ref<Summoner | null> = ref(null)
    return { currentSummoner, querySummoner };
})