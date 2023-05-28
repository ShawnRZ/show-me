# 英雄联盟 SGP 接口访问指南

SGP 接口的鉴权参数与 LCU 不同，并且在每次访问 SGP 接口之前都需要重新获取鉴权参数。

## SGP服务器地址列表
| 服务器 | 地址 |
| :------: | :--: |
| 艾欧尼亚 | `https://hn1-cloud-sgp.lol.qq.com:21019` |
| 祖安 | `https://hn2-sgp.lol.qq.com:21019` |
| 诺克萨斯 | `https://hn3-cloud-sgp.lol.qq.com:21019` |
| 班德尔城 | `https://hn4new-sgp.lol.qq.com:21019` |
| 皮尔特沃夫 | `https://hn5-sgp.lol.qq.com:21019` |
| 战争学院 | `https://hn6-sgp.lol.qq.com:21019` |
| 巨神峰 | `https://hn7-sgp.lol.qq.com:21019` |
| 雷瑟守备 | `https://hn8-cloud-sgp.lol.qq.com:21019` |
| 裁决之地 | `https://hn9-sgp.lol.qq.com:21019` |
| 黑色玫瑰 | `https://hn10-cloud-sgp.lol.qq.com:21019`|
| 暗影岛 | `https://hn11-cloud-sgp.lol.qq.com:21019` |
| 钢铁烈阳 | `https://hn12-sgp.lol.qq.com:21019` |
| 水晶之痕 | `https://hn13-sgp.lol.qq.com:21019` |
| 均衡教派 | `https://hn14new-sgp.lol.qq.com:21019` |
| 影流 | `https://hn15-sgp.lol.qq.com:21019` |
| 守望之海 | `https://hn16new-sgp.lol.qq.com:21019` |
| 征服之海 | `https://hn17-cloud-sgp.lol.qq.com:21019` |
| 卡拉曼达 | `https://hn18-cloud-sgp.lol.qq.com:21019` |
| 皮城警备 | `https://hn19-sgp.lol.qq.com:21019` |
| 比尔吉沃特 | `https://wt1new-sgp.lol.qq.com:21019` |
| 德玛西亚 | `https://wt2new-sgp.lol.qq.com:21019` |
| 弗雷尔卓德 | `https://wt3new-sgp.lol.qq.com:21019` |
| 无畏先锋 | `https://wt4new-sgp.lol.qq.com:21019` |
| 恕瑞玛 | `https://wt5-sgp.lol.qq.com:21019` |
| 扭曲丛林 | `https://wt6-sgp.lol.qq.com:21019` |
| 巨龙之巢 | `https://wt7-sgp.lol.qq.com:21019` |
| 男爵领域 | `https://bgp1-sgp.lol.qq.com:21019` |
| 峡谷之巅 | `https://bgp2-sgp.lol.qq.com:21019` |
| 教育网专区 | `https://edu1-sgp.lol.qq.com:21019`|

## 获取鉴权参数

> SGP 接口的鉴权参数和 LCU 略有不同，想要获取鉴权参数需要借助一个 LCU 接口如下：

- 接口:
  - url: `/entitlements/v1/token`
  - method: `GET`
- 返回数据示例
  ```javascript
  {
    "accessToken": "*********",
    "entitlements": [],
    "issuer": "http://example.com",
    "subject": "****************",
    "token": "**********"
  }
  ```
- 提取`accessToken`字段

## 调用接口

1. 获取`accessToken`参数。

2. 构造请求 `{Host}/{接口}`，添加一个`header`键值对
    ```javascript
    Authorization: Bearer {accessToken}
    ```
3. 访问即可