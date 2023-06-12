<script setup>
import { useRoute } from "vue-router";
import { ref, getCurrentInstance } from "vue";
import SummonerInfo from "@/components/summonerInfo/index.vue";
import RecordList from "@/components/recordList/index.vue";
import { getQuerySummoner } from "@/API/layout.js";
import { $Message } from "@/utils/base.js";
const { proxy } = getCurrentInstance();
let queryName = ref("");
const route = useRoute();
let puuid = ref("");
const init = () => {
  if (route.params.queryName) {
    queryName.value = route.params.queryName;
    getQuerySummoner({ name: queryName.value })
      .then((data) => {
        $Message("查询召唤师", `${queryName.value}`, "success");
        puuid.value = data.puuid;
        proxy.$refs["summonerInfo"].init(puuid.value);
        proxy.$refs["recordList"].init(puuid.value);
      })
      .catch((e) => {
        // querySummoner.setSummoner({});
        if (e.status === 404) {
          $Message("失败!", `召唤师不存在:${queryName.value}！`, "warning");
        } else {
          $Message("失败!", `${e}！`, "warning");
        }
      });
  }
};
init();
</script>

<template>
  <template v-if="route.params.queryName">
    <el-row justify="space-between" class="main-con">
      <el-col :span="6">
        <SummonerInfo ref="summonerInfo" />
      </el-col>
      <el-col :span="18">
        <RecordList ref="recordList" />
      </el-col>
    </el-row>
  </template>

  <template v-else> 搜索框 {{ queryName }}</template>
</template>

<style scoped lang="scss"></style>
