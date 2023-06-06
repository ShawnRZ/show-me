<script setup>
import headerCard from "@/layout/headerCard/index.vue";
import asideCard from "@/layout/asideCard/index.vue";
import { nextTick, provide, ref } from "vue";
import { useRouter } from "vue-router";
import { _getItemUrl, _getPerkUrl, _getSpellUrl } from "@/API/assets.js";
import { $Message } from "@/utils/base.js";
import {
  useItemStore,
  usePerkStore,
  useSpellStore,
} from "@/stors/store/static.js";
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
  Promise.all([_getSpellUrl(), _getPerkUrl(), _getItemUrl()])
    .then((res) => {
      spell.setSpell(res[0]);
      pert.setPerk(res[1]);
      item.setItem(res[2]);
      isRouterLive.value = true;
    })
    .catch((e) => {
      $Message("静态资源加载错误！", e, "warning");
      init();
    });
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
          <template v-if="isRouterLive">
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
