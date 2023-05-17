<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
// import { useConfigStore, useSummonerStore } from '../store';
import { useConfigStore } from '../stors/config';
import { useSummonerStore } from '../stors/summoner';
import { querySummonerByName } from '../lcu';

// 顾北清歌扬
const queryName = ref("");

const summonerStore = useSummonerStore();
const configStore = useConfigStore();

const query = async () => {
    try {
        if (queryName.value == "") {
            ElNotification({
                title: `请输入召唤师名字`,
                position: 'bottom-right',
                type: 'warning',
            })
            return;
        }
        await querySummonerByName(queryName.value)
        ElNotification({
            title: '查询召唤师',
            message: `${queryName.value}`,
            position: 'bottom-right',
            type: 'success',
        })
    } catch (error) {
        ElNotification({
            title: '失败',
            message: `${error}: ${queryName.value}`,
            position: 'bottom-right',
            type: 'warning',
        })
    }
}
</script>

<template>
    <div class="self">
        <el-input v-model="queryName" :disabled="!configStore.ready" placeholder="Please input" size="large"
            @keyup.enter.native="query">
            <template #append>
                <el-button :disabled="!configStore.ready" :icon="Search" @click="query" />
            </template>
        </el-input>
    </div>
</template>

<style lang="scss">
.self {
    display: flex;
    align-items: center;
}
</style>

