<script setup lang="ts">
import gameList from "@/views/home/recordList/gameList/index.vue";
import gameDetail from "@/views/home/recordList/gameDetail/index.vue";
</script>

<template>
  <div class="game-con">
    <el-row justify="space-evenly">
      <el-col :span="6">
        <game-list />
      </el-col>
      <el-col :span="14">
        <game-detail />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.game-con {
  width: 100%;
  height: 100%;
}
</style>
