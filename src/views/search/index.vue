<script setup>
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { ref, watch } from "vue";
import { getQuerySummoner } from "@/API/layout.js";
import { $Message } from "@/utils/base.js";
let queryName = ref("");
const route = useRoute();

const init = () => {
  console.log("搜索初始化", route.params.queryName);
  if (route.params.queryName) {
    queryName.value = route.params.queryName;
    getQuerySummoner({ name: queryName.value })
      .then((data) => {
        $Message("查询召唤师", `${queryName.value}`, "success");
      })
      .catch((e) => {
        // querySummoner.setSummoner({});
        if (e === 404) {
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
  {{ queryName }}
  <template v-if="queryName">
    搜索战绩
    <router-view />
  </template>
  <template v-else> 搜索框 </template>
</template>

<style scoped lang="scss"></style>
