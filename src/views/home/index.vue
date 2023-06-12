<script setup>
import SummonerInfo from "@/components/summonerInfo/index.vue";
import RecordList from "@/components/recordList/index.vue";
import { ref, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import { getCurrentSummoner } from "@/API/layout.js";
const { proxy } = getCurrentInstance();
const route = useRoute();
let puuid = ref("");
const init = () => {
  getCurrentSummoner().then((data) => {
    puuid.value = data.puuid;

    proxy.$refs["summonerInfo"].init(puuid.value);
    proxy.$refs["recordList"].init(puuid.value);
  });
};

init();
</script>

<template>
  <el-row justify="space-between" class="main-con">
    <el-col :span="6">
      <SummonerInfo ref="summonerInfo" />
    </el-col>
    <el-col :span="18">
      <RecordList ref="recordList" />
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
