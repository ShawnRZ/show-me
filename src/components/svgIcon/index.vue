<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string;
  color: string;
}>();

const iconName = computed(() => {
  return `#icon-${props.name}`;
});
const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`;
  return `svg-icon`;
});
</script>

<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
