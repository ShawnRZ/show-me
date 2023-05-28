<script setup>
import { inject, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { getQuerySummoner } from "@/API/layout.js";
import { $Message } from "@/utils/base.js";
import { queryCurrentSummonerStore } from "@/stors/store/summoner.js";
import { useConfigStore } from "@/stors/store/config.js";
import { useRouter } from "vue-router";
const configStore = useConfigStore();
const router = useRouter();
// 顾北清歌扬
const queryName = ref("");
const querySummoner = queryCurrentSummonerStore();

const query = async () => {
  if (queryName.value === "") {
    $Message("请输入召唤师名字!", "", "warning");
    return;
  }
  getQuerySummoner({ name: queryName.value })
    .then((data) => {
      querySummoner.setSummoner(data);
      router.push({
        name: "searchByPuuid",
        params: { puuid: data.puuid },
      });
      // Error: No match for {"name":"search","params":{"puuid":"9c0dcbd4-7c6a-530a-9da2-8e5082a2d4be"}}！
      $Message("查询召唤师", `${queryName.value}`, "success");
    })
    .catch((e) => {
      // querySummoner.setSummoner({});
      if (e === 404) {
        $Message("失败!", `召唤师不存在:${queryName.value}！`, "warning");
      } else {
        $Message("失败!", `${e}！`, "warning");
      }
    });
};
</script>

<template>
  <div class="query-input">
    <el-input
      v-model="queryName"
      :disabled="!configStore.getIsReady"
      placeholder="Please input"
      size="large"
      @keyup.enter.native="query"
    >
      <template #append>
        <el-button
          :disabled="!configStore.getIsReady"
          :icon="Search"
          @click="query"
        />
      </template>
    </el-input>
  </div>
</template>

<style lang="scss">
.query-input {
  width: 400px;
  display: flex;
  align-items: center;
}
</style>
