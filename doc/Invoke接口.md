# Invock接口

## 1. 测试并安装 SSL 证书

### 调用方式

#### 接口
```javascript
invoke("test_and_set_cer");
```

返回值: 无

失败时会抛出错误

#### 例子
```javascript
import { invoke } from "@tauri-apps/api";

try{
    await invoke("test_and_set_cer");
}catch (error){
    console.log(error);
}

```

## 召唤师信息查询（全区）
- 接口：
```javascript
invoke(get_summoner_by_name, {
  name: name
  region: region
});
```
- 参数说明：
  - puuid: 全局ID
  - region: 服务器代码（见《SGP接口访问指南》）

- 返回值
> 失败则抛出错误
```javascript
{
   "accountId" : 4002177047,
   "expPoints" : 1108,
   "expToNextLevel" : 3648,
   "id" : 4002177047,
   "internalName" : "顾北清歌扬",
   "lastGameDate" : 1686708103000,
   "level" : 723,
   "levelAndXpVersion" : 10637,
   "name" : "顾北清歌扬",
   "nameChangeFlag" : false,
   "privacy" : "PUBLIC",
   "profileIconId" : 4658,
   "puuid" : "cb7be6df-59fc-5618-b230-ad321ada241e",
   "revisionDate" : 1686708102000,
   "revisionId" : 0,
   "unnamed" : false
}
```

## 排位数据查询（全区）
- 接口
```javascript
invock(get_ranked_stats_by_puuid, {
  puuid: string,
  region: string,
});
```
- 参数说明：
  - puuid: 全局ID
  - region: 服务器代码（见《SGP接口访问指南》）

- 返回值
 - 见`example/SGP_03.json`
> 失败抛出异常

- 提取有效数据
  - `object.queue[i].queueType`: 比赛模式  
      - `RANKED_FLEX_SR`: 灵活排位
      - `RANKED_SOLO_5x5`: 单/双排
  - `object.queues[i].leaguePoints`: 胜点
  - `object.queues[i].tier`: 段位
  - `object.queues[i].rank`: 小段
  - `object.queues[i].wins`: 胜场
  - `object.queues[i].wins`: 败场（不准确）

## 战绩查询（全区）
- 接口
```javascript
invoke(get_match_history_by_puuid, {
  puuid: string,
  region: string,
  start: number,
  count: number,
});
```
- 返回值: 见`example/SGP_01.json`

- 提取数据
  - 游戏模式: `respon.games[i].json.queueId`
  - 游戏版本: `respon.games[i].json.gameVersion`
  - 地图ID: `respon.games[i].json.mapId`
  - 游戏大区: `respon.games[i].json.platformId`
  - 对局开始时间: `respon.games[i].json.gameCreation`
  - 对局结束时间: `respon.games[i].json.gameEndTimestamp`
  - 对局时长: `respon.games[i].json.gameDuration`
  - 对局玩家: `respon.games[i].json.participants[i]`
    - 英雄ID: `.championId`
    - 装备ID: `.item0` ~ `.item6`
    - 符文: `.perks`
      - 三个基础属性符文: `.statPerks` 
        - `.defense`
        - `.flex`
        - `.offense`
      - 主系: `.styles[0]`
        - 第一个: `.selections[0]`
        - 第二个: `.selections[1]`
        - 第三个: `.selections[2]`
      - 副系: `.styles[1]`
        - 第一个: `.selections[0]`
        - 第二个: `.selections[1]`
    - 击杀: `.kills`
    - 助攻: `.assists`
    - 死亡: `.deaths`
    - KDA: `.kda`
    - 对英雄的总伤害: `.totalDamageDealtToChampions`
    - 对英雄的物理伤害: `.physicalDamageDealtToChampions`
    - 对英雄的魔法伤害: `.magicDamageDealtToChampions`
    - 对英雄的真实伤害: `.trueDamageDealtToChampions`
    - 输出治疗效果: `.totalHeal`
    - 承受伤害: `.totalDamageTaken`
    - 承受物理伤害: `.physicalDamageTaken`
    - 承受魔法伤害: `.magicDamageTaken`
    - 承受真实伤害: `.trueDamageTaken`
    - 自我缓和伤害: `.damageSelfMitigated`
    - 获得金钱: `.goldEarned`
    - 花费金钱: `.goldSpent`
    - 击杀小兵: `.totalMinionsKilled`
    - 击杀野怪: `.neutralMinionsKilled`
    - 视野得分: `.visionScore`
    - 对防御塔总伤害: ``
  - 