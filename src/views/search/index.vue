<script setup>
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
import { getQuerySummoner } from "@/API/layout.js";
import { $Message } from "@/utils/base.js";
import queryPuuid from "@/views/search/queryPuuid/index.vue";
let queryName = ref("");
const route = useRoute();
const router = useRouter();
let puuid = ref("");
const init = () => {
  puuid.value = route.params?.puuid || "";
  if (route.params.queryName) {
    queryName.value = route.params.queryName;
    getQuerySummoner({ name: queryName.value })
      .then((data) => {
        $Message("查询召唤师", `${queryName.value}`, "success");
        puuid.value = data.puuid;
        // router.push({
        //   name: "queryPuuid",
        //   params: { puuid: data.puuid },
        // });
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
  <template v-if="puuid">
    <queryPuuid :puuid="puuid"></queryPuuid>
  </template>

  <template v-else> 搜索框 </template>
</template>

<style scoped lang="scss"></style>
