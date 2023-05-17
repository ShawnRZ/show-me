<script setup lang="ts">
import UserInfo from './components/UserInfo.vue'
import Querry from './components/Querry.vue';
import SummonerInfo from './components/SummonerInfo.vue';
import GameList from './components/GameList.vue';
import GameDetail from './components/GameDetail.vue';
import { appWindow } from '@tauri-apps/api/window'
import { updateCommandLine, updateCurrentSummoner } from './lcu';
import { useConfigStore } from './stors/config';
import { useSummonerStore } from './stors/summoner';


// 初始化
const configStore = useConfigStore();
const summonerStore = useSummonerStore();
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
  <div class="header" data-tauri-drag-region>
    <div class="close" @click="close">
      <Close style="width: 20px;height: 20px;" />
    </div>
    <div class="minmize" @click="minimize">
      <Minus style="width: 20px;height: 20px;" />
    </div>
    <div class="blank" data-tauri-drag-region></div>
    <Querry />
    <div class="blank" data-tauri-drag-region></div>
    <UserInfo />
  </div>

  <div style="height: 100%; box-sizing: border-box; padding: 3px; padding-top: 61px;">
    <div class="main" v-if="configStore.ready">
      <!-- <Suspense> -->
      <SummonerInfo />
      <!-- </Suspense> -->
      <GameList />

    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row-reverse;
  // background-color: rgb(50, 50, 51);
  background-color: rgb(31, 31, 31);

  position: absolute;
  width: 100%;
  height: 60px;
  // border-bottom-color: rgb(42, 42, 42);
  border-bottom: solid 1px rgb(65, 66, 67);

  .blank {
    flex-grow: 1;
  }

  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 33px;
    width: 44px;
    color: rgb(142, 142, 142);

    &:hover {
      background-color: rgb(232, 17, 35);
    }
  }

  .minmize {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 33px;
    width: 44px;
    color: rgb(142, 142, 142);

    &:hover {
      background-color: rgb(77, 77, 78);
    }
  }


}

.main {
  display: flex;

  height: 100%;
  background-color: rgb(30, 30, 30);
}
</style>
