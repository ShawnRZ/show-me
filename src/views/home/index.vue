<script setup lang="ts">
import SummonerInfo from "@/views/home/summonerInfo/index.vue";
import recordList from "@/views/home/recordList/index.vue";
</script>

<template>
  <el-row justify="space-between" class="main-con">
    <el-col :span="6">
      <SummonerInfo />
    </el-col>
    <el-col :span="18">
      <recordList />
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
