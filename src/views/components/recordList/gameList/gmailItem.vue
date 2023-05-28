<script setup>
import {
  switchGameType,
  timeStamp,
} from "@/views/components/recordList/gameList/sourse.js";

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
</script>

<template>
  {{ switchGameType[props.game.queueId] }}
  {{ timeStamp[props.game.gameCreation] }}
  {{ props.game.participants[0].stats.win ? "胜利" : "失败" }}
</template>

<style scoped lang="scss"></style>
