<script setup lang="ts">
import { computed, onMounted, ref, Ref, watch } from "vue";
import { useSummonerStore } from "../stors/summoner";
import { queryMatchHistory } from "../lcu";
import { Match, MatchList, MatchHistory } from "../types/Match";
import { fetch } from "@tauri-apps/api/http";
import GameItem from "./GameItem.vue";

let end = 0;
const summonerStore = useSummonerStore();
const matchList: Ref<MatchHistory | null> = ref(null);
const games: Ref<Match[]> = ref([]);
const spellMapReady = ref(false);
const runesMapReady = ref(false);
const itemMapReady = ref(false);
const matchHistoryReady = ref(false);
const ready = computed(() => {
  return (
    spellMapReady.value &&
    runesMapReady.value &&
    matchHistoryReady.value &&
    itemMapReady.value
  );
});
const finish = computed(() => {
  return end >= matchList.value!.games.gameCount;
});
const loading = ref(true);
let spellMap: Map<
  number,
  {
    id: number;
    name: string;
    description: string;
    cooldown: number;
    iconPath: string;
  }
> = new Map();
let runesMap: Map<
  number,
  {
    id: number;
    name: string;
    majorChangePatchVersion: string;
    tooltip: string;
    shortDesc: string;
    longDesc: string;
    recommendationDescriptor: string;
    iconPath: string;
    endOfGameStatDescs: string[];
    recommendationDescriptorAttributes: {};
  }
> = new Map();
let itemMap: Map<
  number,
  {
    id: number;
    name: string;
    price: number;
    priceTotal: number;
    iconPath: string;
  }
> = new Map();

const querySummoner = computed(() => {
  return summonerStore.querySummoner!.puuid;
});

onMounted(async () => {
  watch(
    querySummoner,
    () => {
      end = 0;
      games.value = [];
      queryMatchHistory(summonerStore.querySummoner!.puuid, end, end + 20)
        .then((res) => {
          matchList.value = res;
          end += 20;
          if (matchList.value === null) {
            return;
          }
          games.value.push(...matchList.value.games.games.reverse());
          loading.value = false;
          matchHistoryReady.value = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    {
      immediate: true,
    }
  );
  summonerStore.querySummoner = summonerStore.currentSummoner;
  let ok = false;
  while (!ok) {
    try {
      await init();
      ok = true;
    } catch (error) {
      console.log(error);
    }
  }
  console.log("元数据加载成功");
});

// 再加载10个
function loadMore() {
  loading.value = true;
  console.log("触底了");
  queryMatchHistory(summonerStore.querySummoner!.puuid, end, end + 10)
    .then((res) => {
      if (res === null) {
        loading.value = false;
        return;
      }
      games.value.push(...res.games.games.reverse());
      end += 10;
      if (res.games.games.length === 10) {
        loading.value = false;
      } else {
        console.log("战绩加载完了！");
      }
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
}

// 加载元数据
const init = async () => {
  const spellUrl =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/zh_cn/v1/summoner-spells.json";
  const perkUrl =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/zh_cn/v1/perks.json";
  const itemUrl =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/zh_cn/v1/items.json";
  let res;

  if (!spellMapReady.value) {
    try {
      console.log(`fetch(${spellUrl})`);

      res = await fetch(spellUrl, {
        method: "GET",
      });
    } catch (error) {
      throw `${error}`;
    }
    if (!res.ok) {
      throw `GET: ${spellUrl}, status: ${res.status}`;
    }
    let spellData = res.data as {
      id: number;
      name: string;
      description: string;
      cooldown: number;
      iconPath: string;
    }[];
    for (let i = 0; i < spellData.length; i++) {
      spellMap.set(spellData[i].id, spellData[i]);
    }
    spellMapReady.value = true;
  }
  if (!runesMapReady.value) {
    try {
      console.log(`fetch(${perkUrl})`);
      res = await fetch(perkUrl, {
        method: "GET",
      });
    } catch (error) {
      throw `${error}`;
    }
    if (!res.ok) {
      throw `GET: ${perkUrl}, status: ${res.status}`;
    }
    let perkData = res.data as {
      id: number;
      name: string;
      majorChangePatchVersion: string;
      tooltip: string;
      shortDesc: string;
      longDesc: string;
      recommendationDescriptor: string;
      iconPath: string;
      endOfGameStatDescs: string[];
      recommendationDescriptorAttributes: {};
    }[];
    for (let i = 0; i < perkData.length; i++) {
      runesMap.set(perkData[i].id, perkData[i]);
    }
    runesMapReady.value = true;
  }
  if (!itemMapReady.value) {
    try {
      console.log(`fetch(${itemUrl})`);
      res = await fetch(itemUrl, {
        method: "GET",
      });
    } catch (error) {
      throw `${error}`;
    }
    if (!res.ok) {
      throw `GET: ${itemUrl}, status: ${res.status}`;
    }
    let itemData = res.data as {
      id: number;
      name: string;
      price: number;
      priceTotal: number;
      iconPath: string;
    }[];
    for (let i = 0; i < itemData.length; i++) {
      itemMap.set(itemData[i].id, itemData[i]);
    }
    itemMapReady.value = true;
  }
};
</script>

<template>
  <div class="self" v-if="ready">
    <el-scrollbar height="100%">
      <ul
        style="height: 100%"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading"
      >
        <li v-for="game in games" :key="game.gameCreation">
          <GameItem
            :game="game"
            :spell-map="spellMap"
            :runes-map="runesMap"
            :item-map="itemMap"
          />
        </li>
        <li v-if="loading && !finish">Loading...</li>
        <li v-if="finish">加载完了</li>
      </ul>
    </el-scrollbar>
    <GameDetail
      :spell-map="spellMap"
      :runes-map="runesMap"
      :item-map="itemMap"
    />
  </div>
</template>

<style lang="scss" scoped>
.self {
  display: flex;

  ul {
    margin: 0px;
    padding: 0px;

    li {
      list-style: none;
      padding: 0px;
      margin: 5px;
      margin-right: 10px;
    }
  }
}
</style>
