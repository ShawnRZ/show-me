<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useConfigStore } from "@/store/config.js";

const router = useRouter();
const isSearch = computed(() => {
  return router.currentRoute.value.fullPath === "/search";
});
let queryName = ref("");
const configStore = useConfigStore();
const query = () => {
  router.push({
    name: "queryByName",
    params: { queryName: queryName.value },
  });
};
</script>

<template>
  <div v-if="isSearch">
    <div class="input">
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
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>
<style scoped lang="scss">
.input {
  width: calc(100% - 100px);
  height: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .el-input {
    width: 600px;
  }
}
</style>
