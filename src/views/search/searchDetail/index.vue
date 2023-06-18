<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const init = () => {
  if (route.params) {
    console.log(route.params);
  }
  // getQuerySummoner({ name: queryName.value })
  //   .then((data) => {
  //     $Message("查询召唤师", `${queryName.value}`, "success");
  //     puuid.value = data.puuid;
  //     proxy.$refs["summonerInfo"].init(puuid.value);
  //     proxy.$refs["recordList"].init(puuid.value);
  //   })
  //   .catch((e) => {
  //     // querySummoner.setSummoner({});
  //     if (e.status === 404) {
  //       $Message("失败!", `召唤师不存在:${queryName.value}！`, "warning");
  //     } else {
  //       $Message("失败!", `${e}！`, "warning");
  //     }
  //   });
};
init();
</script>

<template>
  summoner detail
  <!--  <template v-else>-->
  <!--    <el-row justify="space-between" class="main-con">-->
  <!--      <el-col :span="6">-->
  <!--        <SummonerInfo ref="summonerInfo" />-->
  <!--      </el-col>-->
  <!--      <el-col :span="18">-->
  <!--        <RecordList ref="recordList" />-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--  </template>-->
</template>

<style scoped lang="scss"></style>
