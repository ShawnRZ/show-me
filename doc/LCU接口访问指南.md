# 英雄联盟LCU接口访问指南

1. 获取英雄联盟客户端的监听端口 `port`

2. 获取LCU接口的鉴权参数 `token`

> 以上部分已经使用 Rust 提供了现成的接口

3. 构造请求`127.0.0.1:{port}/{接口}`

    LCU 接口使用 BaseAuthorizatoin 鉴权，由于 tauri 提供的 fetch 无法直接设置 BaseAuth ，所以只能通过在请求的 `header` 中添加 `Authorization` 字段实现。字段值为 `Base base64(riot:{token})`，其中 `base64()` 表示经过 base64 编码的数据。 `token` 为第二步获取的鉴权参数。
