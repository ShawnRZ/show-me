import { RankStatus } from "@/modules/RankStatus.js";

export class Summoner {
  constructor(data = null, queueMap = null) {
    if (data && queueMap) {
      this.profileIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${data.profileIconId}.jpg`;
      this.summonerLevel = data.summonerLevel;
      this.displayName = data.displayName;
      const { RANKED_SOLO_5x5, RANKED_FLEX_SR } = queueMap;
      // 单双
      this.soloCard = new RankStatus(RANKED_SOLO_5x5);
      // 灵活
      this.flexCard = new RankStatus(RANKED_FLEX_SR);
    } else {
      this.profileIcon = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/29.jpg`;
      this.summonerLevel = 0;
      this.displayName = "";
      this.soloCard = new RankStatus();
      this.flexCard = new RankStatus();
    }
  }
}
