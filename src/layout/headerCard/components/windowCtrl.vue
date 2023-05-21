<script setup lang="ts">
import { Close, Minus } from "@element-plus/icons-vue";
import { appWindow } from "@tauri-apps/api/window";
function minimize() {
  appWindow.minimize();
}
function maximize() {
  appWindow.toggleMaximize();
}
function close() {
  appWindow.close();
}
</script>

<template>
  <div class="window-ctrl">
    <div class="minmize" @click="minimize">
      <Minus class="icon" />
    </div>
    <div class="close" @click="close">
      <Close class="icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.window-ctrl {
  height: 60px;
  width: 320px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .minmize {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &:hover {
      background-color: rgb(77, 77, 78);
    }
  }

  .close {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &:hover {
      background-color: rgb(232, 17, 35);
    }
  }
  .icon {
    width: 20px;
    height: 20px;
  }
}
</style>
