<script setup>
import { Match } from "@/modules/Match.js";

import { computed } from "vue";
import PlayerItem from "@/views/components/recordList/gameDetail/playerItem.vue";

const props = defineProps({
  match: {
    type: Object,
    default: {},
  },
});
const detail = computed(() => {
  console.log(props.match);
  return new Match(props.match);
});
</script>

<template>
  <div class="game-detail">
    战绩详情
    <div class="detail-con">
      <template v-for="(item, index) in detail.player" :key="index">
        <player-item v-if="detail" :player="item"></player-item>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.game-detail {
  padding: 0 20px;
}
</style>
