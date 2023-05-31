# Invock接口

## 1. 测试并安装 SSL 证书

### 调用方式

#### 接口
```javascript
invock("test_and_set_cer");
```

返回值: 无

失败时会抛出错误

#### 例子
```javascript
import { invoke } from "@tauri-apps/api";

try{
    await invock("test_and_set_cer");
}catch (error){
    console.log(error);
}

```