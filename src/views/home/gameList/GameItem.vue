<script setup lang="ts">
import {
  computed,
  onBeforeMount,
  ref,
  Ref,
  watch,
  watchEffect,
  defineProps,
} from "vue";
// import { useSummonerStore, useConfigStore, useMatchDetail } from "../store";
import { useSummonerStore } from "@/stors/summoner";
import { useConfigStore } from "@/stors/config";
import { queryMatchHistory, queryMatchDetail } from "@/lcu";
// import { LolMatchHistoryMatchHistoryGame, MatchList } from "../types/MatchList";
import { Match, MatchList } from "@/types/Match";
import { fetch } from "@tauri-apps/api/http";
import { useMatchDetail } from "@/stors/match";

const summonerStore = useSummonerStore();
const configStore = useConfigStore();
const matchDetail = useMatchDetail();
const ready = ref(false);
const props = defineProps<{
  game: Match;
  spellMap: Map<
    number,
    {
      id: number;
      name: string;
      description: string;
      cooldown: number;
      iconPath: string;
    }
  >;
  runesMap: Map<
    number,
    {
      id: number;
      name: string;
      majorChangePatchVersion: string;
      tooltip: string;
      shortDesc: string;
      longDesc: string;
      recommendationDescriptor: string;
      iconPath: string;
      endOfGameStatDescs: string[];
      recommendationDescriptorAttributes: {};
    }
  >;
  itemMap: Map<
    number,
    {
      id: number;
      name: string;
      price: number;
      priceTotal: number;
      iconPath: string;
    }
  >;
}>();

function switchGameType(queueId: number): string {
  let gameType = "";
  switch (queueId) {
    case 430:
      gameType = "匹配模式";
      break;
    case 420:
      gameType = "单排/双排";
      break;
    case 440:
      gameType = "灵活排位";
      break;
    case 450:
      gameType = "极地大乱斗";
      break;
    case 700:
      gameType = "冠军杯赛";
      break;
    case 840:
      gameType = "新手";
      break;
    case 830:
      gameType = "入门";
      break;
    case 850:
      gameType = "一般";
      break;
    case 1900:
      gameType = "无限火力";
      break;
    default:
      break;
  }
  return gameType;
}

function timeStamp(gameCreation: number): string {
  const now = new Date().getTime();
  const stamp = now - gameCreation;
  if (stamp >= 31536000000) {
    return `${Math.floor(stamp / 31536000000)}年前`;
  } else if (stamp >= 2592000000) {
    return `${Math.floor(stamp / 2592000000)}月前`;
  } else if (stamp >= 604800000) {
    return `${Math.floor(stamp / 604800000)}周前`;
  } else if (stamp >= 86400000) {
    return `${Math.floor(stamp / 86400000)}天前`;
  } else if (stamp >= 3600000) {
    return `${Math.floor(stamp / 3600000)}小时前`;
  } else if (stamp >= 60000) {
    return `${Math.floor(stamp / 60000)}分钟前`;
  } else {
    return `${Math.floor(stamp / 1000)}秒前`;
  }
  return "";
}

function getSpellName(spellId: number): string {
  const regex = new RegExp("Icons2D/(.*).png", "gm");
  let o = props.spellMap.get(spellId);
  let url = "";
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

function getRunesUrl(id: number): string {
  const regex = new RegExp("Styles/(.*).png", "gm");
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
    return "gp_ui_placeholder";
  }
  const regex = new RegExp("Icons2D/(.*).png", "gm");
  let o = props.itemMap.get(id);
  if (!o) {
    return "gp_ui_placeholder";
  }
  let url = o.iconPath;
  let m = regex.exec(url);
  if (!m) {
    return "gp_ui_placeholder";
  }
  return m[1].toLocaleLowerCase();
}

function getRuneDetail(
  id: number,
  var1: number,
  var2: number,
  var3: number
): string {
  let detail = "";
  let rune = props.runesMap.get(id);
  if (!rune) {
    return detail;
  }
  for (let i = 0; i < rune.endOfGameStatDescs.length; i++) {
    detail += rune.endOfGameStatDescs[i];
    detail += "<br />";
  }
  detail = detail.replace("@eogvar1@", var1.toString());
  detail = detail.replace("@eogvar2@", var2.toString());
  detail = detail.replace("@eogvar3@", var3.toString());
  return detail;
}

async function query(gameId: number) {
  let md = await queryMatchDetail(gameId);
  matchDetail.detail = md;
}
</script>

<template>
  <el-card
    body-style="padding:0px;"
    style="border-left: solid 6px; border-radius: 4px"
    :style="
      game.participants[0].stats.win
        ? 'border-color: rgb(83, 131, 232);'
        : 'border-color: rgb(232, 64, 87);'
    "
  >
    <div class="game-card">
      <div class="game-info">
        <div
          class="game-type"
          :class="game.participants[0].stats.win ? 'win-color' : 'lose-color'"
        >
          {{ switchGameType(game.queueId) }}
        </div>
        <div class="time-stamp">
          {{ timeStamp(game.gameCreation) }}
        </div>
        <div class="result">
          {{ game.participants[0].stats.win ? "胜利" : "失败" }}
        </div>
        <div class="duration">
          {{ Math.floor(game.gameDuration / 60) }}分{{
            Math.floor(game.gameDuration % 60)
          }}秒
        </div>
      </div>
      <div class="champion-icon">
        <img
          :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${game.participants[0].championId}.png`"
          alt=""
        />
        <span class="level">
          {{ game.participants[0].stats.champLevel }}
        </span>
      </div>
      <div class="spells">
        <div class="spell1">
          <img
            :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${getSpellName(
              game.participants[0].spell1Id
            )}.png`"
            alt=""
          />
        </div>
        <div class="spell2">
          <img
            :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${getSpellName(
              game.participants[0].spell2Id
            )}.png`"
            alt=""
          />
        </div>
      </div>
      <div class="perks-items">
        <div class="perks">
          <el-tooltip placement="top">
            <template #content>
              <span>
                {{ runesMap.get(game.participants[0].stats.perk0)?.name }}
              </span>
              <br />
              <span
                v-html="
                  getRuneDetail(
                    game.participants[0].stats.perk0,
                    game.participants[0].stats.perk0Var1,
                    game.participants[0].stats.perk0Var2,
                    game.participants[0].stats.perk0Var3
                  )
                "
              >
              </span>
            </template>
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(
                game.participants[0].stats.perk0
              )}.png`"
              alt=""
            />
          </el-tooltip>
          <el-tooltip placement="top">
            <template #content>
              <span>
                {{ runesMap.get(game.participants[0].stats.perk1)?.name }}
              </span>
              <br />
              <span
                v-html="
                  getRuneDetail(
                    game.participants[0].stats.perk1,
                    game.participants[0].stats.perk1Var1,
                    game.participants[0].stats.perk1Var2,
                    game.participants[0].stats.perk1Var3
                  )
                "
              >
              </span>
            </template>
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(
                game.participants[0].stats.perk1
              )}.png`"
              alt=""
            />
          </el-tooltip>
          <el-tooltip placement="top">
            <template #content>
              <span>
                {{ runesMap.get(game.participants[0].stats.perk2)?.name }}
              </span>
              <br />
              <span
                v-html="
                  getRuneDetail(
                    game.participants[0].stats.perk2,
                    game.participants[0].stats.perk2Var1,
                    game.participants[0].stats.perk2Var2,
                    game.participants[0].stats.perk2Var3
                  )
                "
              >
              </span>
            </template>
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(
                game.participants[0].stats.perk2
              )}.png`"
              alt=""
            />
          </el-tooltip>
          <el-tooltip placement="top">
            <template #content>
              <span>
                {{ runesMap.get(game.participants[0].stats.perk3)?.name }}
              </span>
              <br />
              <span
                v-html="
                  getRuneDetail(
                    game.participants[0].stats.perk3,
                    game.participants[0].stats.perk3Var1,
                    game.participants[0].stats.perk3Var2,
                    game.participants[0].stats.perk3Var3
                  )
                "
              >
              </span>
            </template>
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(
                game.participants[0].stats.perk3
              )}.png`"
              alt=""
            />
          </el-tooltip>
          <el-tooltip placement="top">
            <template #content>
              <span>
                {{ runesMap.get(game.participants[0].stats.perk4)?.name }}
              </span>
              <br />
              <span
                v-html="
                  getRuneDetail(
                    game.participants[0].stats.perk4,
                    game.participants[0].stats.perk4Var1,
                    game.participants[0].stats.perk4Var2,
                    game.participants[0].stats.perk4Var3
                  )
                "
              >
              </span>
            </template>
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(
                game.participants[0].stats.perk4
              )}.png`"
              alt=""
            />
          </el-tooltip>
          <el-tooltip placement="top">
            <template #content>
              <span>
                {{ runesMap.get(game.participants[0].stats.perk5)?.name }}
              </span>
              <br />
              <span
                v-html="
                  getRuneDetail(
                    game.participants[0].stats.perk5,
                    game.participants[0].stats.perk5Var1,
                    game.participants[0].stats.perk5Var2,
                    game.participants[0].stats.perk5Var3
                  )
                "
              >
              </span>
            </template>
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${getRunesUrl(
                game.participants[0].stats.perk5
              )}.png`"
              alt=""
            />
          </el-tooltip>
        </div>
        <div class="items">
          <el-tooltip
            :content="itemMap.get(game.participants[0].stats.item0)?.name"
            placement="bottom"
          >
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(
                game.participants[0].stats.item0
              )}.png`"
              alt=""
            />
          </el-tooltip>
          <el-tooltip
            :content="itemMap.get(game.participants[0].stats.item1)?.name"
            placement="bottom"
          >
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(
                game.participants[0].stats.item1
              )}.png`"
              alt=""
            />
          </el-tooltip>
          <el-tooltip
            :content="itemMap.get(game.participants[0].stats.item2)?.name"
            placement="bottom"
          >
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(
                game.participants[0].stats.item2
              )}.png`"
              alt=""
            />
          </el-tooltip>
          <el-tooltip
            :content="itemMap.get(game.participants[0].stats.item3)?.name"
            placement="bottom"
          >
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(
                game.participants[0].stats.item3
              )}.png`"
              alt=""
            />
          </el-tooltip>
          <el-tooltip
            :content="itemMap.get(game.participants[0].stats.item4)?.name"
            placement="bottom"
          >
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(
                game.participants[0].stats.item4
              )}.png`"
              alt=""
            />
          </el-tooltip>
          <el-tooltip
            :content="itemMap.get(game.participants[0].stats.item5)?.name"
            placement="bottom"
          >
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(
                game.participants[0].stats.item5
              )}.png`"
              alt=""
            />
          </el-tooltip>
          <el-tooltip
            :content="itemMap.get(game.participants[0].stats.item6)?.name"
            placement="bottom"
          >
            <img
              :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${getItemUrl(
                game.participants[0].stats.item6
              )}.png`"
              alt=""
            />
          </el-tooltip>
        </div>
      </div>
      <div class="stats">
        <div class="kda">
          <span class="kills">
            {{ game.participants[0].stats.kills }}
          </span>
          /
          <span class="dead">
            {{ game.participants[0].stats.assists }}
          </span>
          /
          <span>
            {{ game.participants[0].stats.deaths }}
          </span>
        </div>
        <div class="minions-gold">
          <div class="gold">
            <img src="../assets/icon_gold.png" alt="" />
            <span>{{ game.participants[0].stats.goldEarned }}</span>
          </div>
          <div class="minions">
            <img src="../assets/icon_minions.png" alt="" />
            <span>{{ game.participants[0].stats.totalMinionsKilled }}</span>
          </div>
        </div>
        <div class="damage">
          <img src="../assets/kills.png" alt="" />
          <span>{{
            game.participants[0].stats.totalDamageDealtToChampions
          }}</span>
        </div>
      </div>
      <el-button @click="query(game.gameId)">查看</el-button>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.self {
  display: flex;
  flex-direction: column;

  ul,
  li {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }

  .game-card {
    display: flex;
    // width: 400px;
    margin: 5px;
    align-items: center;

    .game-info {
      width: 65px;

      .game-type {
        font-size: 12px;
        font-weight: 700;
      }

      .time-stamp {
        font-size: 12px;
        color: rgb(117, 133, 146);
      }

      .result {
        font-size: 12px;
        font-weight: 700;
        color: rgb(117, 133, 146);
      }

      .duration {
        font-size: 12px;
        color: rgb(117, 133, 146);
      }
    }

    .champion-icon {
      position: relative;
      width: 52px;
      height: 52px;

      img {
        width: 52px;
        height: 52px;
        border-radius: 50%;
      }

      .level {
        font-size: 12px;
        background-color: rgb(32, 45, 55);
        padding: 3px;
        border-radius: 50%;
        position: absolute;
        right: 0px;
        bottom: 0px;
      }
    }

    .spells {
      height: 50px;
      margin-left: 2px;

      .spell1,
      .spell2 {
        height: 25px;

        img {
          width: 25px;
          height: 25px;
          border-radius: 4px;
        }
      }

      .spell2 {
        margin-top: 2px;
      }
    }

    .perks-items {
      margin-left: 2px;

      .perks {
        height: 25px;

        img {
          width: 25px;
          height: 25px;
          margin-right: 2px;
        }
      }

      .items {
        height: 25px;
        margin-top: 2px;

        img {
          width: 25px;
          height: 25px;
          margin-right: 2px;
          border-radius: 4px;
        }
      }
    }

    .stats {
      margin-left: 10px;

      .kda {
        span {
          font-size: 15px;
          font-weight: 700;
        }

        .dead {
          color: rgb(211, 26, 69);
        }
      }

      .minions-gold {
        display: flex;

        .minions,
        .gold {
          display: flex;
          align-items: center;
          margin-right: 5px;

          img {
            height: 14px;
          }

          span {
            margin-left: 2px;
            font-size: 12px;
          }
        }
      }

      .damage {
        display: flex;
        align-items: center;
        margin-right: 5px;

        img {
          height: 14px;
        }

        span {
          margin-left: 2px;
          font-size: 12px;
        }
      }
    }
  }

  .win-color {
    color: rgb(65, 113, 214);
  }

  .lose-color {
    color: rgb(232, 64, 87);
  }
}
</style>
