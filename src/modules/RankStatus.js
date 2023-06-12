export class RankStatus {
  constructor(data = null) {
    if (data) {
      let tier = data.tier.toLowerCase();
      let icon = tier === "" ? "unranked" : tier;
      this.rankIcon = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${icon}.png`;
      this.rankTier = switchTier[data.tier];
      this.rankDivision = data.division === "NA" ? "" : data.division;
      this.Lp = data.leaguePoints;
      this.Win = data.wins;
      this.Lose = data.losses;
      let winRate = 0;
      if (data.wins + data.losses === 0) {
        winRate = 0;
      } else {
        winRate = Math.floor((data.wins / (data.wins + data.losses)) * 100);
      }
      this.winRate = winRate;
    } else {
      this.rankIcon = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/unranked.png`;
      this.rankTier = "";
      this.rankDivision = "";
      this.Lp = 0;
      this.Win = 0;
      this.Lose = 0;
      this.winRate = 0;
    }
  }
}
const switchTier = {
  IRON: "无畏黑铁",
  BRONZE: "英勇黄铜",
  SILVER: "不屈白银",
  GOLD: "荣耀黄金",
  PLATINUM: "华贵铂金",
  DIAMOND: "璀璨钻石",
  MASTER: "超凡大师",
  GRANDMASTER: "傲世宗师",
  CHALLENGER: "最强王者",
  NONE: "",
};
