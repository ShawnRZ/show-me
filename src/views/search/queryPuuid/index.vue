<script setup>
import SummonerInfo from "@/views/components/summonerInfo/index.vue";
import recordList from "@/views/components/recordList/index.vue";
import { computed, nextTick, provide, ref, watch } from "vue";

const props = defineProps({
  puuid: {
    type: String,
    default: "",
  },
});

let puuid = ref("");
const init = () => {
  puuid.value = props.puuid;
};
init();
</script>

<template>
  <el-row justify="space-between" class="main-con" v-if="puuid">
    <el-col :span="6">
      <SummonerInfo :puuid="puuid" />
    </el-col>
    <el-col :span="18">
      <recordList :puuid="puuid" />
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.main-con {
  width: 100%;
  height: 100%;
  //display: flex;
}
</style>
