<script setup>
import { onMounted, ref } from "vue";
import { getCurrentSummoner } from "@/API/layout.js";
import { $Message, updateCommandLine } from "@/utils/base";
import { useCurrentSummonerStore } from "@/stors/store/summoner.js";
import { useConfigStore } from "@/stors/store/config.js";
import { ElNotification } from "element-plus";

const currentSummoner = useCurrentSummonerStore();
const configStore = useConfigStore();
// 当前召唤师

// 召唤师头像id
let profileIconId = ref(29);
// 召唤师名称
let summonerName = ref("点击连接客户端");
// 召唤师经验进度条
let percentage = ref(100);
const setPercentage = () => {
  if (!currentSummoner.getSummoner) {
    percentage.value = 100;
  }
  percentage.value = Math.floor(
    (currentSummoner.getSummoner.xpSinceLastLevel /
      currentSummoner.getSummoner.xpUntilNextLevel) *
      100
  );
};
// 更新当前召唤师，失败就重新获取客户端参数再试
const update = async () => {
  await updateCommandLine();
  getCurrentSummoner()
    .then((data) => {
      currentSummoner.setSummoner(data);
      profileIconId.value = data.profileIconId || 29;
      summonerName.value = data.displayName || "点击连接客户端";
      setPercentage();
      configStore.setIsReady(true);
      $Message(
        "更新当前召唤师",
        currentSummoner.getSummoner?.displayName,
        "success"
      );
    })
    .catch((e) => {
      configStore.setIsReady(false);
      $Message("更新当前召唤师失败!", e, "warning");
    });
};

onMounted(async () => {
  await update();
});
</script>
<template>
  <div class="user-info" @click="update">
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
.user-info {
  width: 320px;
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
