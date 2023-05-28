<script setup>
import { computed, inject } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();
// 解决路由传参跳转后页面icon不active
const path = computed(() => {
  return router.currentRoute.value.fullPath.split("?")[0];
});
// 解决重定向报错问题
const routers = computed(() => {
  return router.options.routes.filter((item) => {
    return item.name;
  });
});
const reLoad = inject("reLoad");
const menuClick = (menu) => {
  if (menu.index === path.value) {
    reLoad();
  }
};
</script>

<template>
  <el-menu
    router
    :default-active="path"
    class="el-menu-vertical-demo"
    :collapse="true"
  >
    <el-menu-item v-for="item in routers" :index="item.path" @click="menuClick">
      <div :class="['icon-box', item.path === path ? 'active ' : '']">
        <svg-icon :name="item.meta.icon || ''" class="svg-icon"></svg-icon>
      </div>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu-vertical-demo {
  height: 100%;
  background-color: #111022;
  border: 2px solid #525161;
  border-top: 0;
  border-bottom: 0;
  //border-radius: 3px;
}
::v-deep(.el-menu-item) {
  padding: 0;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  &:hover {
    background-color: initial;
  }
}
.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 3px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .svg-icon {
    width: 2em;
    height: 2em;
    color: #625e81;
  }
}
.is-active {
  color: inherit;
}
.active {
  background-color: #343041;
  border: 1px solid #4e4d60;
}
</style>
