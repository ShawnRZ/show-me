<script setup>
import { useRoute } from "vue-router";
import { ref, getCurrentInstance, computed } from "vue";
import SummonerInfo from "@/components/summonerInfo/index.vue";
import RecordList from "@/components/recordList/index.vue";
import { get_summoner_by_name } from "@/API/query.js";
import { Search } from "@element-plus/icons-vue";
import { useConfigStore } from "@/store/config.js";
import { deepCopy } from "@/utils/base.js";
import { switchTier } from "../../components/summonerInfo/source.js";
const { proxy } = getCurrentInstance();
let queryName = ref("");
const route = useRoute();
let puuid = ref("");
let summonerList = ref([]);
const configStore = useConfigStore();

const init = () => {
  if (route.params.queryName) {
    queryName.value = route.params.queryName;
    queryByName(route.params.queryName);
    // getQuerySummoner({ name: queryName.value })
    //   .then((data) => {
    //     $Message("查询召唤师", `${queryName.value}`, "success");
    //     puuid.value = data.puuid;
    //     proxy.$refs["summonerInfo"].init(puuid.value);
    //     proxy.$refs["recordList"].init(puuid.value);
    //   })
    //   .catch((e) => {
    //     // querySummoner.setSummoner({});
    //     if (e.status === 404) {
    //       $Message("失败!", `召唤师不存在:${queryName.value}！`, "warning");
    //     } else {
    //       $Message("失败!", `${e}！`, "warning");
    //     }
    //   });
  }
  if (route.params.summonerId) {
    console.log("跨区查询", route.params);
  }
};
const query = () => {
  queryByName(queryName.value);
};
const queryByName = (queryName) => {
  get_summoner_by_name(queryName).then((res) => {
    console.log(res);
    summonerList.value = deepCopy(res);
  });
};
//头像icon
const profileIcon = computed(() => {
  return (profileIconId) => {
    let id = profileIconId || 29;
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${id}.jpg`;
  };
});
//段位icon
const rankIcon = computed(() => {
  return (ranked) => {
    let tier = "unranked";
    if (ranked.queues) {
      if (ranked.queues[0].tier) {
        tier = ranked.queues[0].tier.toLowerCase();
      }
    }

    return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${tier}.png`;
  };
});
// 段位name
const rankName = computed(() => {
  return (ranked) => {
    let tier = "";
    if (ranked.queues) {
      if (ranked.queues[0].tier) {
        tier = ranked?.queues[0].tier;
      }
    }
    return switchTier[tier];
  };
});
const summonerClick = (row) => {
  console.log("查询详情", row);
};
init();
</script>

<template>
  <div class="search-con">
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

    <!--    <div v-if="summonerList.length !== 0" class="summoner-list">-->
    <div class="summoner-list">
      <p>"{{ queryName }}"的搜索结果是：</p>
      <el-table
        :data="summonerList"
        border
        style="width: 100%"
        max-height="553"
      >
        <el-table-column label="召唤师名称" fixed>
          <template #default="{ row }">
            <div class="custom-cell" @click="summonerClick(row)">
              <img
                :src="profileIcon(row.summoner.profileIconId)"
                alt=""
                class="profileIcon"
              />
              {{ row.summoner.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="所属大区">
          <template #default="{ row }">
            {{ row.server.name }}
          </template>
        </el-table-column>
        <el-table-column label="段位">
          <template #default="{ row }">
            <div class="custom-cell">
              <img :src="rankIcon(row.ranked)" alt="" class="profileIcon" />
              {{ rankName(row.ranked) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="等级">
          <template #default="{ row }"> LV {{ row.summoner.level }} </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!--  <template v-else>-->
  <!--    <el-row justify="space-between" class="main-con">-->
  <!--      <el-col :span="6">-->
  <!--        <SummonerInfo ref="summonerInfo" />-->
  <!--      </el-col>-->
  <!--      <el-col :span="18">-->
  <!--        <RecordList ref="recordList" />-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--  </template>-->
</template>

<style scoped lang="scss">
.search-con {
  width: calc(100% - 100px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .input {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .el-input {
      width: 600px;
    }
  }

  .summoner-list {
    width: 100%;
    height: 600px;
    .custom-cell {
      display: flex;
      align-items: center;
      padding: 0 20px;
      cursor: pointer;
      .profileIcon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>
