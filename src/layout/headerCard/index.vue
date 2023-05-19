<script setup lang="ts">
import userInfo from "@/layout/headerCard/components/UserInfo.vue";
import query from "@/layout/headerCard/components/Query.vue";
import WindowCtrl from "@/layout/headerCard/components/windowCtrl.vue";
</script>

<template>
  <div class="headerCard" data-tauri-drag-region>
    <user-info />
    <query />
    <window-ctrl />
  </div>
</template>

<style scoped lang="scss">
.headerCard {
  display: flex;
  justify-content: space-between;
}
</style>
