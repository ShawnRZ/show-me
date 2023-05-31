<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { $Message } from "@/utils/base.js";
import { useConfigStore } from "@/stors/store/config.js";
import { useRouter } from "vue-router";

const configStore = useConfigStore();
const router = useRouter();
// 顾北清歌扬
const queryName = ref("");
const query = () => {
  if (queryName.value === "") {
    $Message("请输入召唤师名字!", "", "warning");
    return;
  }
  router.push({
    name: "queryByName",
    params: { queryName: queryName.value },
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
