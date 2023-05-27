<script setup>
import headerCard from "@/layout/headerCard/index.vue";
import asideCard from "@/layout/asideCard/index.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <headerCard></headerCard>
      </el-header>
      <el-container>
        <el-aside width="100px">
          <asideCard></asideCard>
        </el-aside>
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.common-layout {
  width: 100%;
  height: 100%;
  background-color: rgb(30, 30, 30);
  .el-container {
    height: 100%;
  }
  //.el-main {
  //  height: calc(100% - 60px);
  //}
}
.el-header {
  padding: 0;
}
::v-deep(.el-main) {
  padding: 0;
}
</style>
