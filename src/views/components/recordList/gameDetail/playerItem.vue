<script setup>
import { computed } from "vue";
import { Match, Player } from "@/modules/Match.js";

const props = defineProps({
  player: {
    type: Object,
    default: {},
  },
});
const player = computed(() => {
  return props.player;
});
</script>

<template>
  {{ player }}
  <!--  <div class="player">-->
  <!--    <div class="champion"></div>-->
  <!--    <div class="spells"></div>-->
  <!--    <div class="summoner-name"></div>-->
  <!--    <div class="perks-items">-->
  <!--      <div class="perks"></div>-->
  <!--      <div class="items"></div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped lang="scss"></style>
