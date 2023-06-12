<script setup>
import gameDetail from "@/components/recordList/gameDetail/index.vue";
import gameItem from "@/components/recordList/gameList/gmailItem.vue";

import { ref, watch } from "vue";
import { $Message } from "@/utils/base.js";
import { getMatchDetail, getSummonerMatchHistory } from "@/API/home.js";
const props = defineProps({});
let games = ref([]);
let gameCount = ref(0);
let begIndex = ref(0);
let endIndex = ref(10);
let loading = ref(false);
let detailLoading = ref(false);
let puuid = ref("");
const init = async (Puuid) => {
  console.log(Puuid);
  // loading.value = true;
  puuid.value = Puuid;
  getHistory(begIndex.value, endIndex.value);
};

const getHistory = (beg, end) => {
  loading.value = true;
  let index = {
    begIndex: String(beg),
    endIndex: String(end),
  };
  getSummonerMatchHistory(puuid.value, index)
    .then((data) => {
      console.log("战绩列表加载成功");
      gameCount.value = data.games.gameCount;
      games.value = data.games.games.reverse().slice(0, 10);
      begIndex.value = 0;
      endIndex.value = 10;
      loading.value = false;
    })
    .catch((e) => {
      console.log(e);
      // 递归调用，请求失败 endIndex+10
      // beg = beg + 10;
      end = end + 10;
      if (e.data.message.includes("body was empty")) {
        $Message("", "召唤师战绩为空！", "warning");
      } else {
        getHistory(beg, end);
      }
    });
};
let gameIndex = ref(-1);
let match = ref(null);
const select = (index, game) => {
  gameIndex.value = index;
  detailLoading.value = true;
  getMatchDetail(game.gameId)
    .then((data) => {
      match.value = data;
      detailLoading.value = false;
    })
    .catch((e) => {
      match.value = null;
      console.log("再次请求战绩详情");
      select(index, game);
    })
    .finally(() => {});
};
let currentIndex = ref(1);
watch(currentIndex, (value) => {
  match.value = null;
  gameIndex.value = -1;
  console.log(`第${currentIndex.value}次请求战绩列表`);
  begIndex.value = (value - 1) * 10;
  endIndex.value = value * 10;
  getHistory(begIndex.value, endIndex.value);
});
defineExpose({
  init,
});
</script>

<template>
  <div class="game-con">
    <el-row style="height: 100%">
      <div class="game-record" v-loading="loading">
        <el-scrollbar height="800px">
          <template v-for="(item, index) in games" :key="index">
            <game-item
              :game="item"
              v-if="!loading"
              @click="select(index, item)"
              :class="gameIndex === index ? '' : 'gameItem'"
            ></game-item>
          </template>
        </el-scrollbar>
        <el-pagination
          background
          layout="prev, pager, next"
          :pagerCount="9"
          :page-size="10"
          v-model:current-page="currentIndex"
          :total="gameCount"
        />
      </div>
      <div class="game-detail" v-loading="detailLoading">
        <game-detail :match="match" v-if="match" />
      </div>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.game-con {
  //width: 100%;
  //height: calc(100% - 40px);
  display: flex;
  padding: 0 10px;
  .game-record {
    width: 486px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .game-detail {
    width: 500px;
    height: 800px;
  }
}
.gameItem {
  box-shadow: -10px 0px 20px -10px rgba(0, 0, 0, 0.75) inset;
}
</style>
