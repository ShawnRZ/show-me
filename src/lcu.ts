import { invoke } from "@tauri-apps/api";
import { useSummonerStore } from "./stors/summoner";
import { useConfigStore } from "./stors/config";
import { fetch } from "@tauri-apps/api/http";
import { RankedStats } from "./types/RankedStats";
import { Summoner } from "./types/Summoner";
import { MatchList, Match, MatchHistory } from "./types/Match";


export { queryMatchDetail, queryMatchHistory, queryRankStats, updateCommandLine, updateCurrentSummoner, querySummonerByName }

// 获取客户端命令行参数
async function updateCommandLine() {
    // console.log(`getCommandLine()`);

    const configStore = useConfigStore();
    let res = await invoke("get_command_line") as string[];
    if (res[0] === "" || res[1] === "") {
        throw "获取客户端参数失败！"
    }
    configStore.token = res[0];
    configStore.port = res[1];
    // console.log(configStore.port);
    // console.log(configStore.token);
}

// 获取当前客户端登陆的玩家
async function updateCurrentSummoner() {
    const summonerStore = useSummonerStore();
    const configStore = useConfigStore();

    // console.log(`getCurrentSummoner()`);
    // console.log(`fetch(https://127.0.0.1:${configStore.port}/lol-summoner/v1/current-summoner`);

    let res;
    try {
        res = await fetch(`https://127.0.0.1:${configStore.port}/lol-summoner/v1/current-summoner`, {
            method: 'GET',
            headers: {
                Authorization: `Basic ${btoa(`riot:${configStore.token}`)} `
            }
        })
    } catch (err) {
        throw err;
    }
    if (!res.ok) {
        throw `status:${res.status}`
    }
    summonerStore.currentSummoner = res.data as Summoner
    // console.log('当前召唤师：', summonerStore.currentSummoner);

}

// 查询玩家
async function querySummonerByName(name: string) {
    const summonerStore = useSummonerStore();
    const configStore = useConfigStore();

    // console.log(`querySummonerByName(${name})`);
    // console.log(`fetch(https://127.0.0.1:${configStore.port}/lol-summoner/v1/summoners`);

    let res;
    try {
        res = await fetch(`https://127.0.0.1:${configStore.port}/lol-summoner/v1/summoners`, {
            method: "GET",
            headers: {
                Authorization: `Basic ${btoa(`riot:${configStore.token}`)} `
            },
            query: {
                name: name,
            }
        })
    } catch (err) {
        throw err;
    }
    if (!res.ok) {
        throw `查无此人`
    }
    summonerStore.querySummoner = res.data as Summoner;
}

// 查询排位数据
async function queryRankStats(puuid: string): Promise<RankedStats> {
    const configStore = useConfigStore();

    console.log(`queryRankStats(${puuid})`);
    console.log(`fetch(https://127.0.0.1:${configStore.port}/lol-ranked/v1/ranked-stats/${puuid}`);

    let res;
    try {
        res = await fetch(`https://127.0.0.1:${configStore.port}/lol-ranked/v1/ranked-stats/${puuid}`, {
            method: "GET",
            headers: {
                Authorization: `Basic ${btoa(`riot:${configStore.token}`)} `
            },
        })
    } catch (err) {
        throw err;
    }
    if (!res.ok) {
        throw `status:${res.status}`
    }
    return res.data as RankedStats;
}

// 查询历史战绩
async function queryMatchHistory(puuid: string, beg: number, end: number): Promise<MatchHistory> {
    const configStore = useConfigStore();

    console.log(`getMatchHistory(${puuid}, ${beg}, ${end})`);
    console.log(`fetch(https://127.0.0.1:${configStore.port}/lol-match-history/v1/products/lol/${puuid}/matches)`);

    let res;
    try {
        res = await fetch(`https://127.0.0.1:${configStore.port}/lol-match-history/v1/products/lol/${puuid}/matches`, {
            method: "GET",
            headers: {
                Authorization: `Basic ${btoa(`riot:${configStore.token}`)} `
            },
            query: {
                begIndex: beg.toString(),
                endIndex: end.toString(),
            },
        })
    } catch (err) {
        throw err;
    }
    if (!res.ok) {
        throw `status:${res.status}`
    }
    return res.data as MatchHistory;
}

// 获取某一局游戏的详细信息
async function queryMatchDetail(gameId: number) {
    const configStore = useConfigStore();

    console.log(`queryMatchDetail(${gameId})`);
    console.log(`fetch(https://127.0.0.1:${configStore.port}/lol-match-history/v1/games/${gameId}`);

    let res;
    try {
        res = await fetch(`https://127.0.0.1:${configStore.port}/lol-match-history/v1/games/${gameId}`, {
            method: "GET",
            headers: {
                Authorization: `Basic ${btoa(`riot:${configStore.token}`)} `
            }
        })
    } catch (err) {
        throw err;
    }
    if (!res.ok) {
        throw `status:${res.status}`
    }
    console.log(res.data);

    return res.data as Match;
}