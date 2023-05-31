<script setup>
import SummonerInfo from "@/views/components/summonerInfo/index.vue";
import recordList from "@/views/components/recordList/index.vue";
import { computed, nextTick, provide, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
let puuid = ref("");
const init = () => {
  console.log("home加载", route.params.puuid);
  if (route.params.puuid) {
    puuid.value = route.params.puuid;
  }
};

init();
</script>

<template>
  <el-row justify="space-between" class="main-con" v-if="puuid">
    <el-col :span="6">
      <SummonerInfo :puuid="puuid" />
    </el-col>
    <el-col :span="18">
      <recordList :puuid="puuid" />
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
