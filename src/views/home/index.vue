<script setup lang="ts">
import SummonerInfo from "@/views/home/summonerInfo/index.vue";
import GameList from "@/views/home/GameList/index.vue";
</script>

<template>
  <!--  <div class="main-con">-->
  <el-row justify="space-between" class="main-con">
    <el-col :span="6">
      <SummonerInfo />
    </el-col>
    <el-col :span="18">
      <GameList />
    </el-col>
  </el-row>

  <!-- </Suspense> -->
  <!--    <GameList />-->
  <!--  </div>-->
</template>

<style scoped lang="scss">
.main-con {
  width: 100%;
  height: 100%;
  //display: flex;
}
</style>
