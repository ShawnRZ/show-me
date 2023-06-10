<script setup>
import headerCard from "@/layout/headerCard/index.vue";
import asideCard from "@/layout/asideCard/index.vue";
import { nextTick, provide, ref } from "vue";
import { useRouter } from "vue-router";
import { useItemStore, usePerkStore, useSpellStore } from "@/store/static.js";
import { useConfigStore } from "@/store/config.js";

const configStore = useConfigStore();
let isRouterLive = ref(true);
const router = useRouter();
const spell = useSpellStore();
const pert = usePerkStore();
const item = useItemStore();
const reLoad = () => {
  isRouterLive.value = false;
  nextTick(() => {
    isRouterLive.value = true;
  });
};
provide("reLoad", reLoad);
const init = () => {
  isRouterLive.value = false;
};
init();
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
          <template v-if="isRouterLive && configStore.getIsReady">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </template>
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
