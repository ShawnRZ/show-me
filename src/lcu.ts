import { invoke } from "@tauri-apps/api";
import { useSummonerStore } from "./stors/summoner";
import { useConfigStore } from "./stors/config";
import { fetch } from "@tauri-apps/api/http";
import { RankedStats } from "./types/RankedStats";
import { Summoner } from "./types/Summoner";
import { MatchList, Match, MatchHistory } from "./types/Match";


export { queryMatchDetail, queryMatchHistory, queryRankStats, updateCommandLine, updateCurrentSummoner, querySummonerByName }

/**
 * 获取连接客户端需要的端口和鉴权token，失败则抛出错误
 * 
 */
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

/**
 * 获取对当前客户端登陆的玩家，如果失败直接抛出异常
 * 
 * @returns Summoner
 * 
 */
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

/**
 * 查询指定名字的召唤师，失败则抛出错误
 * 
 * @param name 查询召唤师的名字
 */
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

/**
 * 查询指定玩家的排位统计信息
 * 
 * @param puuid 需要查询的玩家的puuid
 * @returns 返回查询玩家的排位统计信息
 */
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

/**
 * 查询指定玩家的历史战绩，[beg,end)，对局编号按时间由近到远从0开始编号，每次最多查询20场对局
 * 若查询的对局编号超出可查询的范围，超出部分会被忽略，每个玩家的的可查询范围从MatchHistory.games.gameCount获取
 * 此接口中每一场对局仅包含自己的数据
 * @example
 * 查询最近的两场对局 
 * ```ts
 * queryMatchHistory(puuid, 0, 2)
 * ```
 * 查询最近的四场对局，每次查询两场
 * ```ts
 * queryMatchHistory(puuid,0,2)
 * queryMatchHistory(puuid,2,3)
 * ```
 * @param puuid 查询玩家的puuid
 * @param beg 开始的对局编号
 * @param end 结束的对局编号
 * @returns MatchHistory
 */
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

/**
 * 获取一场对局的详细信息，失败则抛出错误
 * 此接口包含全部10个玩家的数据
 * @param gameId 对局id
 * @returns Match
 */
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