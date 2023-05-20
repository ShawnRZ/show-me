## 英雄的头像等具体信息

### 获取头像
1. 从`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons`可以查看到全部英雄头像
2. 使用`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/{championId}.png`获取指定英雄的头像



### 获取详细信息
1. 从`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/zh_cn/v1/champions/`可以看到最新版本的英雄中文信息列表
2. 通过指定英雄ID获取对应的详细信息: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/zh_cn/v1/champions/{championId}.json`
3. 数据示例
    ```javascript
    {
        "id": 1,
        "name": "黑暗之女",
        "alias": "Annie",
        "title": "安妮",
        "shortBio": "拥有危险夺命的能力，却长着一幅小大人儿的可爱模样，这就是掌握深不可测占火魔法的女孩——安妮。安妮生活在诺克萨斯北边的山脚下，但即便是在这种地方，她也依然是魔法师中的异类。她与火焰的紧密关系与生俱来——最初那些火焰是伴随着喜怒无常的冲动情绪出现的，后来她学会了如何掌握这些“好玩的小把戏”。其中，安妮最喜欢的就是她召唤亲爱的泰迪熊提伯斯——那头狂野的守护火兽。如今安妮已经迷失在了永恒的天真里，她在黑暗森林中游荡，寻觅着能陪自己玩耍的人。",
        "tacticalInfo": {
            "style": 10,
            "difficulty": 1,
            "damageType": "kMagic"
        },
        "playstyleInfo": {
            "damage": 3,
            "durability": 1,
            "crowdControl": 3,
            "mobility": 1,
            "utility": 2
        },
        "squarePortraitPath": "/lol-game-data/assets/v1/champion-icons/1.png",
        "stingerSfxPath": "/lol-game-data/assets/v1/champion-sfx-audios/1.ogg",
        "chooseVoPath": "/lol-game-data/assets/v1/champion-choose-vo/1.ogg",
        "banVoPath": "/lol-game-data/assets/v1/champion-ban-vo/1.ogg",
        "roles": ["mage"],
        "recommendedItemDefaults": [],
        ...,
    }
    ```

## 获取召唤师图标
