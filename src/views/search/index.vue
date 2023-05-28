<script setup>
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { ref, watch } from "vue";
let puuid = ref("");
const route = useRoute();
watch(
  () => route.params.puuid,
  (newPuuid) => {
    puuid.value = newPuuid;
    init();
  }
);
const init = () => {
  console.log("初始化");
};
</script>

<template>
  搜索{{ puuid }}
  <router-view />
</template>

<style scoped lang="scss"></style>
