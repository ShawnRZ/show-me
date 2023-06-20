<script setup>
import { computed, ref } from "vue";
import { Match, Player } from "@/modules/Match.js";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  player: {
    type: Object,
    default: {},
  },
});
const player = computed(() => {
  return props.player;
});
const searchName = (player) => {
  router.push({
    name: "queryByName",
    params: { queryName: player.summonerName },
  });
  // 跨区查询跳转
  // router.push({
  //   name: "queryBySummoner",
  //   params: { summonerId: player.summonerId, platformId: player.platformId },
  // });
};
</script>

<template>
  <div class="player">
    <div class="champion">
      <img class="icon" :src="player.champIcon" alt="" />
      <div class="level">{{ player.champLevel }}</div>
    </div>
    <div class="spells">
      <img :src="player.spell1" alt="" />
      <img :src="player.spell2" alt="" />
    </div>
    <div class="summoner-name" @click="searchName(player)">
      {{ player.summonerName }}
    </div>
    <div class="perks-items">
      <div class="perks">
        <div v-for="perk in player.perks">
          <el-tooltip placement="top">
            <template #content>
              <span>
                {{ perk.perkName }}
              </span>
              <br />
              <span v-html="perk.perkDetail"></span>
            </template>
            <img :src="perk.perkIcon" alt="" />
          </el-tooltip>
        </div>
      </div>
      <div class="items">
        <div v-for="perk in player.items">
          <img :src="perk.itemIcon" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.player {
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  img {
    width: 25px;
    height: 25px;
  }
  .champion {
    width: 70px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .icon {
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }
    .level {
      position: absolute;
      bottom: 6px;
      left: 6px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #202d37;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .spells {
    width: 30px;
    height: 50px;
  }
  .summoner-name {
    height: 55px;
    width: 140px;
    cursor: pointer;
  }
  .perks-items {
    width: 175px;
    .perks {
      width: 175px;
      display: flex;
    }
    .items {
      width: 175px;
      display: flex;
    }
  }
}
</style>
