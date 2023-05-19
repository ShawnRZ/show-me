<script setup lang="ts">
import { useConfigStore } from "@/stors/config";
import { useSummonerStore } from "@/stors/summoner";
import { computed } from "vue";
import { fetch } from "@tauri-apps/api/http";
import { updateCurrentSummoner, updateCommandLine } from "@/lcu";
import { onMounted } from "vue";

const summonerStore = useSummonerStore();
const configStore = useConfigStore();

const percentage = computed(() => {
  if (!summonerStore.currentSummoner) {
    return 100;
  }
  return Math.floor(
    (summonerStore.currentSummoner.xpSinceLastLevel /
      summonerStore.currentSummoner.xpUntilNextLevel) *
      100
  );
});
const profileIconId = computed(() => {
  if (!summonerStore.currentSummoner) {
    return 29;
  }
  return summonerStore.currentSummoner.profileIconId;
});
const summonerName = computed(() => {
  if (!summonerStore.currentSummoner) {
    return "点击连接客户端";
  }
  return summonerStore.currentSummoner.displayName;
});

// 更新当前召唤师，失败就重新获取客户端参数再试
const update = async () => {
  try {
    await updateCommandLine();
    await updateCurrentSummoner();
    summonerStore.querySummoner = summonerStore.currentSummoner;
    configStore.ready = true;
    ElNotification({
      title: "更新当前召唤师",
      message: summonerStore.currentSummoner!.displayName,
      position: "bottom-right",
      type: "success",
    });
  } catch (error) {
    configStore.ready = false;
    ElNotification({
      title: "更新当前召唤师失败",
      // message: '请启动客户端并使用管理员权限启动本程序',
      message: `${error}`,
      position: "bottom-right",
      type: "warning",
    });
  }
};

onMounted(async () => {
  await update();
});
</script>
<template>
  <div class="self" @click="update">
    <div class="icon">
      <el-image
        class="img"
        :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${profileIconId}.jpg`"
      ></el-image>
    </div>
    <div class="info">
      <div class="display-name">{{ summonerName }}</div>
      <el-progress
        :percentage="percentage"
        :show-text="false"
        :stroke-width="10"
        striped
        striped-flow
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.self {
  width: 200px;
  .icon {
    height: 50px;

    .img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
  }

  .info {
    .display-name {
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      // 防止换行
      white-space: nowrap;
      width: 200px;
    }

    width: 130px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 10px;
  }

  color: rgb(237, 237, 237);
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 20px;
  display: flex;

  &:hover {
    cursor: pointer;
  }
}
</style>
