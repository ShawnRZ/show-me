<script setup lang="ts">
import { computed } from 'vue';
// import { useMatchDetail } from '../store';
import { useMatchDetail } from '../stors/match';

const matchDetail = useMatchDetail();
let detail = computed(() => {
    return matchDetail.detail;
})

const props = defineProps<{
    spellMap: Map<number, { id: number, name: string, description: string, cooldown: number, iconPath: string }>
    runesMap: Map<number, { id: number, name: string, majorChangePatchVersion: string, tooltip: string, shortDesc: string, longDesc: string, recommendationDescriptor: string, iconPath: string, endOfGameStatDescs: string[], recommendationDescriptorAttributes: {} }>
    itemMap: Map<number, { id: number, name: string, price: number, priceTotal: number, iconPath: string }>,
}>();

function getSpellName(spellId: number): string {
    const regex = new RegExp("Icons2D/(.*).png", 'gm')
    let o = props.spellMap.get(spellId);
    let url = ""
    if (!o) {
        return "summoner_empty";
    }
    url = o.iconPath;
    let m = regex.exec(url);
    if (!m) {
        return "summoner_empty";
    }
    return m[1].toLocaleLowerCase();
}

function getRuneDetail(id: number, var1: number, var2: number, var3: number): string {
    let detail = '';
    let rune = props.runesMap.get(id);
    if (!rune) {
        return detail;
    }
    for (let i = 0; i < rune.endOfGameStatDescs.length; i++) {
        detail += rune.endOfGameStatDescs[i];
        detail += '<br />';
    }
    detail = detail.replace('@eogvar1@', var1.toString());
    detail = detail.replace('@eogvar2@', var2.toString());
    detail = detail.replace('@eogvar3@', var3.toString());
    return detail;
}

function getRunesUrl(id: number): string {
    const regex = new RegExp("Styles/(.*).png", 'gm')
    let o = props.runesMap.get(id);
    if (!o) {
        return "runesicon";
    }
    let url = o.iconPath;
    let m = regex.exec(url);
    if (!m) {
        return "runesicon";
    }
    return m[1].toLocaleLowerCase();
}

function getItemUrl(id: number): string {
    if (id === 0) {
        return 'gp_ui_placeholder';
    }
    const regex = new RegExp("Icons2D/(.*).png", 'gm')
    let o = props.itemMap.get(id);
    if (!o) {
        return 'gp_ui_placeholder';
    }
    let url = o.iconPath;
    let m = regex.exec(url);
    if (!m) {
        return 'gp_ui_placeholder';
    }
    return m[1].toLocaleLowerCase();
}

</script>


<template>
    <div class="self" v-if="detail !== null">
        <div class="player" v-for="(p, i) in detail.participants" :key="p.participantId">
            <div class="champion-icon">
                <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${p.championId}.png`"
                    alt="">
                <div class="level">
                    {{ p.stats.champLevel }}
                </div>
            </div>
            <div class="spells">
                <div class="spell1">
                    <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${getSpellName(p.spell1Id)}.png`"
                        alt="">
                </div>
                <div class="spell2">
                    <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${getSpellName(p.spell2Id)}.png`"
                        alt="">
                </div>
            </div>
            <div class="summoner-name">
                {{ detail.participantIdentities[i].player.summonerName }}
            </div>
            <div class="perks-items">
                <div class="perks">
                    <el-tooltip placement="top">
                        <template #content>
                            <span>
                                {{ runesMap.get(p.stats.perk0)?.name }}
                            </span>
                            <br>
                            <span v-html="getRuneDetail(p.stats.perk0,
                                p.stats.perk0Var1, p.stats.perk0Var2,
                                p.stats.perk0Var3)">

                            </span>
                        </template>
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(p.stats.perk0)}.png`"
                            alt="">
                    </el-tooltip>
                    <el-tooltip placement="top">
                        <template #content>
                            <span>
                                {{ runesMap.get(p.stats.perk1)?.name }}
                            </span>
                            <br>
                            <span v-html="getRuneDetail(p.stats.perk1,
                                p.stats.perk1Var1, p.stats.perk1Var2,
                                p.stats.perk1Var3)">

                            </span>
                        </template>
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(p.stats.perk1)}.png`"
                            alt="">
                    </el-tooltip>
                    <el-tooltip placement="top">
                        <template #content>
                            <span>
                                {{ runesMap.get(p.stats.perk2)?.name }}
                            </span>
                            <br>
                            <span v-html="getRuneDetail(p.stats.perk2,
                                p.stats.perk2Var1, p.stats.perk2Var2,
                                p.stats.perk2Var3)">

                            </span>
                        </template>
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(p.stats.perk2)}.png`"
                            alt="">
                    </el-tooltip>
                    <el-tooltip placement="top">
                        <template #content>
                            <span>
                                {{ runesMap.get(p.stats.perk3)?.name }}
                            </span>
                            <br>
                            <span v-html="getRuneDetail(p.stats.perk3,
                                p.stats.perk3Var1, p.stats.perk3Var2,
                                p.stats.perk3Var3)">

                            </span>
                        </template>
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(p.stats.perk3)}.png`"
                            alt="">
                    </el-tooltip>
                    <el-tooltip placement="top">
                        <template #content>
                            <span>
                                {{ runesMap.get(p.stats.perk4)?.name }}
                            </span>
                            <br>
                            <span v-html="getRuneDetail(p.stats.perk4,
                                p.stats.perk4Var1, p.stats.perk4Var2,
                                p.stats.perk4Var3)">

                            </span>
                        </template>
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(p.stats.perk4)}.png`"
                            alt="">
                    </el-tooltip>
                    <el-tooltip placement="top">
                        <template #content>
                            <span>
                                {{ runesMap.get(p.stats.perk5)?.name }}
                            </span>
                            <br>
                            <span v-html="getRuneDetail(p.stats.perk5,
                                p.stats.perk5Var1, p.stats.perk5Var2,
                                p.stats.perk5Var3)">

                            </span>
                        </template>
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(p.stats.perk5)}.png`"
                            alt="">
                    </el-tooltip>
                </div>
                <div class="items">
                    <el-tooltip :content="itemMap.get(p.stats.item0)?.name" placement="bottom">
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(p.stats.item0)}.png`"
                            alt="">
                    </el-tooltip>
                    <el-tooltip :content="itemMap.get(p.stats.item1)?.name" placement="bottom">
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(p.stats.item1)}.png`"
                            alt="">
                    </el-tooltip>
                    <el-tooltip :content="itemMap.get(p.stats.item2)?.name" placement="bottom">
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(p.stats.item2)}.png`"
                            alt="">
                    </el-tooltip>
                    <el-tooltip :content="itemMap.get(p.stats.item3)?.name" placement="bottom">
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(p.stats.item3)}.png`"
                            alt="">
                    </el-tooltip>
                    <el-tooltip :content="itemMap.get(p.stats.item4)?.name" placement="bottom">
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(p.stats.item4)}.png`"
                            alt="">
                    </el-tooltip>
                    <el-tooltip :content="itemMap.get(p.stats.item5)?.name" placement="bottom">
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(p.stats.item5)}.png`"
                            alt="">
                    </el-tooltip>
                    <el-tooltip :content="itemMap.get(p.stats.item6)?.name" placement="bottom">
                        <img :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(p.stats.item6)}.png`"
                            alt="">
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.self {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .player {
        display: flex;

        .champion-icon {
            width: 32px;
            height: 32px;
            position: relative;

            img {
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }

            .level {
                position: absolute;
                left: -3px;
                bottom: -3px;
                font-size: 12px;
                background-color: rgb(32, 45, 55);
                border-radius: 500px;
            }
        }

        .spells {
            img {
                width: 16px;
            }
        }

        // .perks {
        //     img {
        //         width: 16px;
        //     }
        // }

        .summoner-name {
            width: 150px;
        }

        .perks-items {

            .perks,
            .items {
                img {
                    width: 16px;
                }
            }

        }
    }
}
</style>