import { invoke } from "@tauri-apps/api";
import wrappedInvoke from "@/utils/wrappedInvoke.js";

export function get_summoner_by_name(name) {
  let promiseList = SGP_SERVER_LIST.map((item) => {
    let data = {
      name: name,
      region: item.region,
    };
    let p = new Promise((resolve, reject) => {
      wrappedInvoke("get_summoner_by_name", data)
        .then((res1) => {
          if (res1) {
            let params = {
              puuid: res1.puuid,
              region: item.region,
            };
            wrappedInvoke("get_ranked_stats_by_puuid", params)
              .then((res2) => {
                let result = {
                  summoner: res1,
                  ranked: res2,
                  server: item,
                };
                resolve(result);
              })
              .catch((e) => {
                reject(`${data.name} 召唤师的ranked不存在`);
              });
          }
        })
        .catch((e) => {
          reject(`${data.name} 召唤师不存在`);
        });
    });
    return p;
  });
  let result = [];
  return new Promise(async (resolve, reject) => {
    await Promise.allSettled(promiseList)
      .then((res) => {
        result = res
          .filter((item) => {
            return item.value !== undefined;
          })
          .map((item) => {
            return item.value;
          });
        resolve(result);
      })
      .catch((e) => {
        // 所有请求被拒绝
        console.log(e);
        reject(e);
      });
  });
}
// 服务器代码名称地址
const SGP_SERVER_LIST = [
  {
    region: "hn1",
    name: "艾欧尼亚",
    address: "https://hn1-cloud-sgp.lol.qq.com:21019",
  },
  {
    region: "hn2",
    name: "祖安",
    address: "https://hn2-sgp.lol.qq.com:21019",
  },
  {
    region: "hn3",
    name: "诺克萨斯",
    address: "https://hn3-cloud-sgp.lol.qq.com:21019",
  },
  {
    region: "hn4",
    name: "班德尔城",
    address: "https://hn4new-sgp.lol.qq.com:21019",
  },
  {
    region: "hn5",
    name: "皮尔特沃夫",
    address: "https://hn5-sgp.lol.qq.com:21019",
  },
  {
    region: "hn6",
    name: "战争学院",
    address: "https://hn6-sgp.lol.qq.com:21019",
  },
  {
    region: "hn7",
    name: "巨神峰",
    address: "https://hn7-sgp.lol.qq.com:21019",
  },
  {
    region: "hn8",
    name: "雷瑟守备",
    address: "https://hn8-cloud-sgp.lol.qq.com:21019",
  },
  {
    region: "hn9",
    name: "裁决之地",
    address: "https://hn9-sgp.lol.qq.com:21019",
  },
  {
    region: "hn10",
    name: "黑色玫瑰",
    address: "https://hn10-cloud-sgp.lol.qq.com:21019",
  },
  {
    region: "hn11",
    name: "暗影岛",
    address: "https://hn11-cloud-sgp.lol.qq.com:21019",
  },
  {
    region: "hn12",
    name: "钢铁烈阳",
    address: "https://hn12-sgp.lol.qq.com:21019",
  },
  {
    region: "hn13",
    name: "水晶之痕",
    address: "https://hn13-sgp.lol.qq.com:21019",
  },
  {
    region: "hn14",
    name: "均衡教派",
    address: "https://hn14new-sgp.lol.qq.com:21019",
  },
  {
    region: "hn15",
    name: "影流",
    address: "https://hn15-sgp.lol.qq.com:21019",
  },
  {
    region: "hn16",
    name: "守望之海",
    address: "https://hn16new-sgp.lol.qq.com:21019",
  },
  {
    region: "hn17",
    name: "征服之海",
    address: "https://hn17-cloud-sgp.lol.qq.com:21019",
  },
  {
    region: "hn18",
    name: "卡拉曼达",
    address: "https://hn18-cloud-sgp.lol.qq.com:21019",
  },
  {
    region: "hn19",
    name: "皮城警备",
    address: "https://hn19-sgp.lol.qq.com:21019",
  },
  {
    region: "wt1",
    name: "比尔吉沃特",
    address: "https://wt1new-sgp.lol.qq.com:21019",
  },
  {
    region: "wt2",
    name: "德玛西亚",
    address: "https://wt2new-sgp.lol.qq.com:21019",
  },
  {
    region: "wt3",
    name: "弗雷尔卓德",
    address: "https://wt3new-sgp.lol.qq.com:21019",
  },
  {
    region: "wt4",
    name: "无畏先锋",
    address: "https://wt4new-sgp.lol.qq.com:21019",
  },
  {
    region: "wt5",
    name: "恕瑞玛",
    address: "https://wt5-sgp.lol.qq.com:21019",
  },
  {
    region: "wt6",
    name: "扭曲丛林",
    address: "https://wt6-sgp.lol.qq.com:21019",
  },
  {
    region: "wt7",
    name: "巨龙之巢",
    address: "https://wt7-sgp.lol.qq.com:21019",
  },
  {
    region: "sgp1",
    name: "男爵领域",
    address: "https://bgp1-sgp.lol.qq.com:21019",
  },
  {
    region: "sgp2",
    name: "峡谷之巅",
    address: "https://bgp2-sgp.lol.qq.com:21019",
  },
  {
    region: "edu1",
    name: "教育网专区",
    address: "https://edu1-sgp.lol.qq.com:21019",
  },
];
