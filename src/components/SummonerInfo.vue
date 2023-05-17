<script setup lang="ts">
import { computed, ref, Ref, watch } from "vue"
import { queryRankStats } from "../lcu"
import { RankedStats } from "../types/RankedStats"
import { useConfigStore } from "../stors/config"
import { useSummonerStore } from "../stors/summoner"

const summonerStore = useSummonerStore();
const configStore = useConfigStore();


const rankedStats: Ref<RankedStats | null> = ref(null);
const ready = ref(false);

const soloRankIcon = ref("unranked")
const soloRankTier = ref("")
const soloRankDivision = ref("")
const soloLp = ref(0)
const soloWin = ref(0)
const soloLose = ref(0)
const soloWinRate = computed(() => {
    if (soloLose.value + soloWin.value === 0) {
        return 0;
    }
    return Math.floor(soloWin.value / (soloLose.value + soloWin.value) * 100)
})

const flexRankIcon = ref("unranked")
const flexRankTier = ref("")
const flexRankDivision = ref("")
const flexLp = ref(0)
const flexWin = ref(0)
const flexLose = ref(0)
const flexWinRate = computed(() => {
    if (flexLose.value + flexWin.value === 0) {
        return 0;
    }
    return Math.floor(flexWin.value / (flexLose.value + flexWin.value) * 100)
})

//  "NONE" | "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND" | "MASTER" | "GRANDMASTER" | "CHALLENGER"
const switchTier = (tier: string) => {
    switch (tier) {
        case 'IRON':
            return '无畏黑铁'
        case 'BRONZE':
            return '英勇黄铜'
        case 'SILVER':
            return '不屈白银'
        case 'GOLD':
            return '荣耀黄金'
        case 'PLATINUM':
            return '华贵铂金'
        case 'DIAMOND':
            return '璀璨钻石'
        case 'MASTER':
            return '超凡大师'
        case 'GRANDMASTER':
            return '傲世宗师'
        case 'CHALLENGER':
            return '最强王者'
    }
    return ""
}

const querySummoner = computed(() => {
    return summonerStore.querySummoner!.puuid
})

// 监听数据
watch(
    querySummoner,
    () => {
        ready.value = false
        queryRankStats(summonerStore.querySummoner!.puuid).then((res) => {
            rankedStats.value = res;
            if (rankedStats.value === null) {
                return;
            }
            soloRankIcon.value = (rankedStats.value as RankedStats).queueMap["RANKED_SOLO_5x5"].tier.toLowerCase();
            soloRankIcon.value = soloRankIcon.value === 'none' ? 'unranked' : soloRankIcon.value = soloRankIcon.value;
            soloRankTier.value = switchTier((rankedStats.value as RankedStats).queueMap["RANKED_SOLO_5x5"].tier);
            soloRankDivision.value = (rankedStats.value as RankedStats).queueMap["RANKED_SOLO_5x5"].division;
            if (soloRankDivision.value === 'NA') {
                soloRankDivision.value = ''
            }
            soloLp.value = (rankedStats.value as RankedStats).queueMap["RANKED_SOLO_5x5"].leaguePoints;
            soloLose.value = (rankedStats.value as RankedStats).queueMap["RANKED_SOLO_5x5"].losses;
            soloWin.value = (rankedStats.value as RankedStats).queueMap["RANKED_SOLO_5x5"].wins;

            flexRankIcon.value = (rankedStats.value as RankedStats).queueMap["RANKED_FLEX_SR"].tier.toLowerCase();
            flexRankIcon.value = flexRankIcon.value === 'none' ? 'unranked' : flexRankIcon.value = flexRankIcon.value;
            flexRankTier.value = switchTier((rankedStats.value as RankedStats).queueMap["RANKED_FLEX_SR"].tier);
            flexRankDivision.value = (rankedStats.value as RankedStats).queueMap["RANKED_FLEX_SR"].division;
            if (flexRankDivision.value === 'NA') {
                flexRankDivision.value = ''
            }
            flexLp.value = (rankedStats.value as RankedStats).queueMap["RANKED_FLEX_SR"].leaguePoints;
            flexLose.value = (rankedStats.value as RankedStats).queueMap["RANKED_FLEX_SR"].losses;
            flexWin.value = (rankedStats.value as RankedStats).queueMap["RANKED_FLEX_SR"].wins;

            ready.value = true
        }).catch((err) => {
            console.log(err);
        })
    },
    {
        immediate: true,
    }
)


</script>

<template>
    <div class="self">

        <div class="profile">
            <el-skeleton :loading="!ready" :animated="true">
                <template #template>
                    <div style="display: flex;">
                        <el-skeleton-item variant="image" style="width: 100px; height: 100px; border-radius: 50%;" />
                        <el-skeleton-item variant="rect" style="width: 190px; height: 30px;margin-left: 20px;" />
                    </div>
                </template>
                <template #default>
                    <div class="icon">
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${summonerStore.querySummoner!.profileIconId}.jpg`"
                            alt="">
                        <span class="level">{{ summonerStore.querySummoner!.summonerLevel }}</span>
                    </div>
                    <div class="info">
                        <el-tooltip :content="summonerStore.querySummoner!.displayName" placement="bottom">
                            <div class="summoner-name">
                                {{ summonerStore.querySummoner!.displayName }}
                            </div>
                        </el-tooltip>
                    </div>
                </template>
            </el-skeleton>
        </div>

        <el-card class="solo-rank">
            <template #header>
                <div class="card-header">
                    <span>单双排</span>
                </div>
            </template>

            <el-skeleton :loading="!ready" :animated="true">
                <template #template>
                    <div style="display: flex;">
                        <el-skeleton-item variant="image" style="width: 72px; height: 72px; border-radius: 50%;" />
                        <div
                            style="width: 70%;display: flex;flex-direction: column;justify-content: center;margin-left: 10px;">
                            <el-skeleton-item variant="h3" style="width: 100%;" />
                            <el-skeleton-item variant="h3" style="width: 100%;margin-top: 10px;" />
                        </div>
                    </div>
                </template>
                <template #default>
                    <div class="card-body">
                        <div class="rank-icon">
                            <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${soloRankIcon}.png`"
                                alt="">
                        </div>
                        <div class="rank-level">
                            <div class="level">
                                <span class="tier">{{ soloRankTier }}</span>
                                <span class="division">{{ soloRankDivision }}</span>
                            </div>
                            <div class="lp">
                                <span>{{ soloLp }}</span>LP
                            </div>
                        </div>
                        <div class="win-lose">
                            {{ soloWin }}胜{{ soloLose }}负
                            <br>
                            胜率{{ soloWinRate }}%
                        </div>
                    </div>
                </template>
            </el-skeleton>
        </el-card>
        <el-card class="flex-rank">
            <template #header>
                <div class="card-header">
                    <span>灵活排位</span>
                </div>
            </template>

            <el-skeleton :loading="!ready" :animated="true">
                <template #template style="display: flex;">
                    <div style="display: flex;">
                        <el-skeleton-item variant="image" style="width: 72px; height: 72px; border-radius: 50%;" />
                        <div
                            style="width: 70%;display: flex;flex-direction: column;justify-content: center;margin-left: 10px;">
                            <el-skeleton-item variant="h3" style="width: 100%;" />
                            <el-skeleton-item variant="h3" style="width: 100%;margin-top: 10px;" />
                        </div>
                    </div>
                </template>
                <template #default>
                    <div class="card-body">
                        <div class="rank-icon">
                            <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${flexRankIcon}.png`"
                                alt="">
                        </div>
                        <div class="rank-level">
                            <div class="level">
                                <span class="tier">{{ flexRankTier }}</span>
                                <span class="division">{{ flexRankDivision }}</span>
                            </div>
                            <div class="lp">
                                <span>{{ flexLp }}</span>LP
                            </div>

                        </div>
                        <div class="win-lose">
                            {{ flexWin }}胜{{ flexLose }}负
                            <br>
                            胜率{{ flexWinRate }}%
                        </div>
                    </div>
                </template>
            </el-skeleton>
        </el-card>

    </div>
</template>

<style scoped lang="scss">
.self {
    // background-color: red;
    background-color: rgb(24, 24, 24);
    display: flex;
    flex-direction: column;
    width: 350px;

    .flex-rank,
    .solo-rank {
        // align-self: flex-start;
        width: 330px;
        // height: 170px;
        margin-top: 10px;

        .card-body {
            display: flex;

            // width: 320px;
            .rank-level {
                display: flex;
                flex-direction: column;
                // align-items: center;
                justify-content: center;
                margin-left: 10px;
                flex-grow: 1;

                .level {
                    font-size: 20px;
                    font-weight: 700;
                }

                .lp {
                    color: rgb(117, 133, 146);
                }
            }

            .win-lose {
                margin: auto 0px;
                text-align: right;
            }

            .rank-icon {
                img {
                    width: 72px;
                    height: 72px;
                    // background-color: rgb(247, 247, 249);
                    // border-radius: 50%;
                }
            }
        }
    }


    .profile {
        display: flex;
        margin: 20px;
        width: 330px;

        .info {
            margin-left: 10px;

            .summoner-name {
                font-size: 24px;
                font-weight: 700;
                color: white;
                max-width: 220px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .icon {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100px;
            height: 100px;

            img {
                width: 100px;
                height: 100px;
                border-radius: 20px;
            }

            span {
                color: white;
                margin-top: -8px;
                font-size: 12px;
                padding: 0 8px;
                border-radius: 10px;
                background-color: rgb(32, 45, 55);
            }
        }
    }

}
</style>