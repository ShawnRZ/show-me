<script setup>
import { ref } from "vue";
import { getRankStatus, getSummoner } from "@/API/home.js";
import { Summoner } from "@/modules/Summoner.js";

let summoner = ref(new Summoner());
let loading = ref(true);
const init = (puuid) => {
  loading.value = true;
  Promise.all([getSummoner(puuid), getRankStatus(puuid)]).then((res) => {
    summoner.value = new Summoner(res[0], res[1].queueMap);
    loading.value = false;
  });
};
// init();
defineExpose({
  init,
});
</script>

<template>
  <div class="user-card">
    <div class="profile">
      <el-skeleton :loading="loading" :animated="true">
        <template #template>
          <div style="display: flex">
            <el-skeleton-item variant="image" class="te-img" />
            <el-skeleton-item variant="rect" class="te-rect" />
          </div>
        </template>
        <template #default>
          <div class="icon">
            <img :src="summoner.profileIcon" alt="" />
            <span class="level">
              {{ summoner.summonerLevel }}
            </span>
          </div>
          <div class="info">
            <el-tooltip :content="summoner.displayName" placement="bottom">
              <div class="summoner-name">
                {{ summoner.displayName }}
              </div>
            </el-tooltip>
          </div>
        </template>
      </el-skeleton>
    </div>

    <el-card
      class="solo-rank"
      v-for="(item, index) in [summoner.soloCard, summoner.flexCard]"
    >
      <template #header>
        <span>{{ ["单双排位", "灵活排位"][index] }}</span>
      </template>

      <el-skeleton :loading="loading" :animated="true">
        <template #template>
          <div style="display: flex">
            <el-skeleton-item variant="image" class="te-img" />
            <div class="te-text">
              <el-skeleton-item variant="h3" style="width: 100%" />
              <el-skeleton-item
                variant="h3"
                style="width: 100%; margin-top: 10px"
              />
            </div>
          </div>
        </template>
        <template #default>
          <div class="card-body">
            <div class="rank-icon">
              <img :src="item.rankIcon" alt="" />
            </div>
            <div class="rank-level">
              <div class="level">
                <span class="tier">{{ item.rankTier }}</span>
                <span class="division">{{ item.rankDivision }}</span>
              </div>
              <div class="lp">
                <span>{{ item.Lp }}LP</span>
              </div>
            </div>
            <div class="win-lose">
              {{ item.Win }}胜{{ item.Lose }}负
              <br />
              胜率{{ item.winRate }}%
            </div>
          </div>
        </template>
      </el-skeleton>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.user-card {
  background-color: rgb(24, 24, 24);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 370px;
  height: 100%;
  .profile {
    display: flex;
    margin: 20px;
    width: 330px;

    .te-img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .te-rect {
      width: 190px;
      height: 30px;
      margin-left: 20px;
    }
    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100px;
      height: 100px;

      img {
        width: 100px;
        height: 100px;
        border-radius: 20px;
      }

      span {
        color: white;
        margin-top: -8px;
        font-size: 12px;
        padding: 0 8px;
        border-radius: 10px;
        background-color: rgb(32, 45, 55);
      }
    }
    .info {
      margin-left: 10px;

      .summoner-name {
        font-size: 24px;
        font-weight: 700;
        color: white;
        max-width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .flex-rank,
  .solo-rank {
    // align-self: flex-start;
    width: 330px;
    // height: 170px;
    margin-top: 10px;
    .te-img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
    }
    .te-text {
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
    }
    .card-body {
      display: flex;
      .rank-icon {
        img {
          width: 72px;
          height: 72px;
          // background-color: rgb(247, 247, 249);
          // border-radius: 50%;
        }
      }
      // width: 320px;
      .rank-level {
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        margin-left: 10px;
        flex-grow: 1;

        .level {
          font-size: 20px;
          font-weight: 700;
        }

        .lp {
          color: rgb(117, 133, 146);
        }
      }

      .win-lose {
        margin: auto 0;
        text-align: right;
      }
    }
  }
}
</style>
