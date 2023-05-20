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

## 获取召唤师技能图标及描述信息

> 召唤师技能图标的获取相对英雄图标麻烦一点

1. 从`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/zh_cn/v1/summoner-spells.json`获取到召唤师技能的描述信息列表

2. 通过spellId在表中查找到对应的数据，示例如下：

    ```javascript
    {
    "id": 1,
    "name": "净化",
    "description": "移除身上的所有限制效果（压制效果和击飞效果除外）和召唤师技能的减益效果，并且若在接下来的3秒里再次被施加限制效果时，新效果的持续时间会减少65%。",
    "summonerLevel": 9,
    "cooldown": 210,
    "gameModes": [
        "URF",
        "NEXUSBLITZ",
        "ARSR",
        "ONEFORALL",
        "ARAM",
        "CLASSIC",
        "PRACTICETOOL",
        "DOOMBOTSTEEMO",
        "TUTORIAL",
        "ULTBOOK",
        "FIRSTBLOOD",
        "PROJECT"
    ],
    "iconPath": "/lol-game-data/assets/DATA/Spells/Icons2D/Summoner_boost.png"
    },
    ```
3. 从上述数据中拿到`iconPath`，使用正则表达式匹配到`Summoner_boot.png`
4. 再将其转化为全小写`summoner_boost.png`
5. 拼接出最后的url：`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/{spellName}`可以得到：`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_boost.png`

## 获取符文图标和详细信息

> 获取方式和召唤师技能类似

1. 从``获取到装符文的图标和描述信息
2. 通过itemId在表中找到对应的数据，示例如下
```javascript
  {
    "id": 8369,
    "name": "先攻",
    "majorChangePatchVersion": "11.23",
    "tooltip": "在进入与英雄战斗的@GraceWindow.2@秒内，对一名敌方英雄进行的攻击或技能将提供@GoldProcBonus@金币和<b>先攻</b>效果，持续@Duration@秒，来使你对英雄们造成<truedamage>@DamageAmp*100@%</truedamage>额外<truedamage>伤害</truedamage>，并提供<gold>{{ Item_Melee_Ranged_Split }}</gold>该额外伤害值的<gold>金币</gold>。<br><br>冷却时间：<scaleLevel>@Cooldown@</scaleLevel>秒<br><hr><br>已造成的伤害：@f1@<br>已提供的金币：@f2@",
    "shortDesc": "在你率先发起与英雄的战斗时，造成9%额外伤害，持续3秒，并基于该额外伤害提供金币。",
    "longDesc": "在进入与英雄战斗的0.25秒内，对一名敌方英雄进行的攻击或技能将提供5金币和<b>先攻</b>效果，持续3秒，来使你对英雄们造成<truedamage>9%</truedamage>额外<truedamage>伤害</truedamage>，并提供<gold>100% (远程英雄为70%)</gold>该额外伤害值的<gold>金币</gold>。<br><br>冷却时间：<scaleLevel>25 ~ 15</scaleLevel>秒",
    "recommendationDescriptor": "真实伤害，金币收入",
    "iconPath": "/lol-game-data/assets/v1/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png",
    "endOfGameStatDescs": [
      "已造成的伤害：@eogvar1@",
      "已提供的金币：@eogvar2@"
    ],
    "recommendationDescriptorAttributes": {
      
    }
  }
```
3. 从`iconPath`中匹配到`Inspiration/FirstStrike/FirstStrike.png`，再转为全小写`inspiration/firststrike/firststrike.png`
4. 最后拼接url`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/{perkName}`得到`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/firststrike/firststrike.png`

