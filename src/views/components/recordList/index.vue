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
let spellMap = ref({});
let perkMap = ref({});
let itemMap = ref({});
let games = ref([]);
let gameCount = ref(0);
let begIndex = ref(0);
let endIndex = ref(10);
const init = async () => {
  // getItemUrl().then((res) => {
  //   console.log(res);
  // });
  Promise.all([getSpellUrl(), getPerkUrl(), getItemUrl()])
    .then((res) => {
      spellMap.value = res[0];
      perkMap.value = res[1];
      itemMap.value = res[2];
      ready.value = true;
    })
    .catch((e) => {
      $Message("静态资源加载错误！", e, "warning");
    });
  getHistory(begIndex.value, endIndex.value);
};

const getHistory = (beg, end) => {
  let index = {
    begIndex: String(beg),
    endIndex: String(end),
  };
  getSummonerMatchHistory(props.puuid, index)
    .then((data) => {
      console.log("战绩列表加载成功");
      gameCount.value = data.games.gameCount;
      games.value = data.games.games.reverse();
      begIndex.value = 0;
      endIndex.value = 10;
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
    <el-row justify="space-evenly" style="height: 100%">
      <el-col :span="10" class="game-record">
        <el-scrollbar height="800px">
          <template v-for="(item, index) in games" :key="index">
            <game-item
              :spellMap="spellMap"
              :perkMap="perkMap"
              :itemMap="itemMap"
              :game="item"
              v-if="ready"
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
      </el-col>
      <el-col :span="12">
        <game-detail />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.game-con {
  width: 100%;
  height: 100%;
  .game-record {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
