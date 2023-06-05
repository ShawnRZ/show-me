<script setup>
import gameDetail from "@/views/components/recordList/gameDetail/index.vue";
import gameItem from "@/views/components/recordList/gameList/gmailItem.vue";

import { getItemUrl, getPerkUrl, getSpellUrl } from "@/API/assets.js";
import { ref, watch } from "vue";
import { $Message } from "@/utils/base.js";
import { getSummonerMatchHistory } from "@/API/home.js";
const props = defineProps({
  puuid: {
    type: String,
    default: "",
  },
});
let ready = ref(false);
let games = ref([]);
let gameCount = ref(0);
let begIndex = ref(0);
let endIndex = ref(10);
let loading = ref(false);
const init = async () => {
  // getItemUrl().then((res) => {
  //   console.log(res);
  // });
  loading.value = true;

  getHistory(begIndex.value, endIndex.value);
};

const getHistory = (beg, end) => {
  loading.value = true;
  let index = {
    begIndex: String(beg),
    endIndex: String(end),
  };
  getSummonerMatchHistory(props.puuid, index)
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
const select = (index) => {
  gameIndex.value = index;
};
let currentIndex = ref(1);
watch(currentIndex, (value) => {
  console.log(`第${currentIndex.value}次请求战绩列表`);
  begIndex.value = (value - 1) * 10;
  endIndex.value = value * 10;
  getHistory(begIndex.value, endIndex.value);
});
init();
</script>

<template>
  <div class="game-con">
    <el-row style="height: 100%">
      <div class="game-record">
        <el-scrollbar height="800px" v-loading="loading">
          <template v-for="(item, index) in games" :key="index">
            <game-item
              :game="item"
              v-if="!loading"
              @click="select(index)"
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
      <div>
        <game-detail />
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
}
.gameItem {
  box-shadow: -10px 0px 20px -10px rgba(0, 0, 0, 0.75) inset;
}
</style>
