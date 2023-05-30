<script setup>
import { computed, ref } from "vue";
import { Game } from "@/modules/Game.js";

const props = defineProps({
  spellMap: {
    type: Object,
    default: {},
  },
  perkMap: {
    type: Object,
    default: {},
  },
  itemMap: {
    type: Object,
    default: {},
  },
  game: {
    type: Object,
    default: {},
  },
});
// let game = ref({});
// const init = () => {
//   game.value = new Game(props.game);
// };
const game = computed(() => {
  return new Game(props.game, props.spellMap, props.perkMap, props.itemMap);
});
console.log(game.value);
// init();
</script>

<template>
  <!--  {{ switchGameType[props.game.queueId] }}-->
  <!--  {{ timeStamp[props.game.gameCreation] }}-->
  <!--  {{ props.game.participants[0].stats.win ? "胜利" : "失败" }}-->
  <div :class="['game-card', game.win ? 'win-border' : 'lose-border']">
    <!--	  游戏信息-->
    <div class="game-info">
      <p class="game-type win-text">{{ game.gameType }}</p>
      <p class="time-stamp">{{ game.timeStamp }}</p>
      <p class="result">
        {{ game.win ? "胜利" : "失败" }}
      </p>
      <p class="duration">
        {{ game.duration }}
      </p>
    </div>
    <!--	  英雄头像-->
    <div class="champion-icon">
      <div class="champion-con">
        <img :src="game.championIcon" alt="" />
        <div class="level">{{ game.champLevel }}</div>
      </div>
    </div>
    <!--	  召唤师技能-->
    <div class="spells">
      <img :src="game.spell1" alt="" />
      <img :src="game.spell2" alt="" />
    </div>
    <!--	  符文和装备-->
    <div class="perks-items">
      <div class="perk" v-for="(item, index) in game.perks">
        <el-tooltip :content="item.perkName" placement="top">
          <img :key="index" :src="item.perkIcon" alt="" />
        </el-tooltip>
      </div>
      <div class="item" v-for="(item, index) in game.items">
        <el-tooltip
          :content="item.itemName"
          v-if="item.itemName"
          placement="bottom"
        >
          <img :src="item.itemIcon" :key="index" alt="" class="item" />
        </el-tooltip>
        <img :src="item.itemIcon" :key="index" v-else alt="" class="item" />
      </div>
    </div>
    <div class="stats">
      <p style="font-weight: 700; font-size: 14px">
        <span>&nbsp;10&nbsp;</span>
        /
        <span>&nbsp;17&nbsp;</span>
        /
        <span>&nbsp;16&nbsp;</span>
      </p>
      <p>
        <template v-for="item in 2">
          <span>
            <img data-v-d48b5504="" src="/src/assets/icon_gold.png" alt="" />
          </span>
          <span>12345</span>
        </template>
      </p>
      <p>
        <img data-v-d48b5504="" src="/src/assets/kills.png" alt="" />
        <span>12</span>
      </p>
    </div>
    <!--    <el-button>查看</el-button>-->
  </div>
</template>

<style scoped lang="scss">
.game-card {
  width: 460px;
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 10px;
  padding: 10px;
  margin-bottom: 5px;
  img {
    width: 25px;
    height: 25px;
  }
  p {
    margin: 0;
  }
  .game-info {
    color: #788491;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .game-type {
      font-size: 14px;
      font-weight: 700;
    }
    .win-text {
      color: #5282e6;
    }
    .lose-text {
      color: #e63f56;
    }
    .result {
      font-size: 12px;
    }
  }
  .champion-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .champion-con {
      position: relative;
      img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
      }
      .level {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 18px;
        height: 18px;
        background-color: #202d37;
        border-radius: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }

  .spells {
    width: 25px;
    height: 50px;
  }
  .perks-items {
    width: 175px;
    .perk,
    .item {
      display: inline-block;
    }
    img {
      border-radius: 4px;
    }
  }
  .stats {
    width: 120px;
    height: 60px;
    margin-left: 5px;
    img {
      width: 15px;
      height: 15px;
    }
  }
}
.win-border {
  border-left: 6px solid #5282e6;
  border-top: 2px solid #5282e6;
  border-right: 2px solid #5282e6;
  border-bottom: 2px solid #5282e6;
  border-radius: 5px;
}
.lose-border {
  border-left: 6px solid #e63f56;
  border-top: 2px solid #e63f56;
  border-right: 2px solid #e63f56;
  border-bottom: 2px solid #e63f56;
  border-radius: 5px;
}
</style>
