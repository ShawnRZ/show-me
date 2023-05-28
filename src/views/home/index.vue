<script setup>
import SummonerInfo from "@/views/components/summonerInfo/index.vue";
import recordList from "@/views/components/recordList/index.vue";
import { computed, nextTick, provide, ref, watch } from "vue";
import {
  queryCurrentSummonerStore,
  useCurrentSummonerStore,
} from "@/stors/store/summoner.js";
import { deepCopy } from "@/utils/base.js";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
let summoner = ref({});
const currentSummoner = useCurrentSummonerStore();
const init = () => {
  summoner.value = deepCopy(currentSummoner.getSummoner);
};

init();
</script>

<template>
  <el-row justify="space-between" class="main-con">
    <el-col :span="6">
      <SummonerInfo :summoner="summoner" />
    </el-col>
    <el-col :span="18">
      <recordList :summoner="summoner" />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.main-con {
  width: 100%;
  height: 100%;
  //display: flex;
}
</style>
