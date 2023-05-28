export const switchGameType = {
  430: "匹配模式",
  420: "单排/双排",
  440: "灵活排位",
  450: "极地大乱斗",
  700: "冠军杯赛",
  840: "新手",
  830: "一般",
  1900: "无限火力",
};
export const timeStamp = (gameCreation) => {
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
};
