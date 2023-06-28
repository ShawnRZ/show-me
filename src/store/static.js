import { defineStore } from "pinia";
import { _getItemUrl, _getPerkUrl, _getSpellUrl } from "@/API/assets.js";
import { $Message } from "@/utils/base.js";

// 召唤师技能
export const useSpellStore = defineStore("spell", {
  state: () => {
    return {
      Spell: new Map(),
    };
  },
  actions: {
    async getSpell() {
      if (this.Spell.size === 0) {
        const maxRetryCount = 10;
        let retryCount = 0;
        // while (retryCount < maxRetryCount) {
        //   try {
        //     this.Spell = await _getSpellUrl();
        //     console.log("Spell静态资源获取成功");
        //     break;
        //   } catch (e) {
        //     retryCount++;
        //     if (retryCount >= maxRetryCount) {
        //       $Message("Spell静态资源获取失败！", e, "error");
        //       break;
        //     }
        //     // 重试之前等待一段时间
        //     await new Promise((resolve) => setTimeout(resolve, 1000));
        //   }
        // }
      }
      return this.Spell;
    },
  },
});
//符文
export const usePerkStore = defineStore("perk", {
  state: () => {
    return {
      Perk: new Map(),
    };
  },
  actions: {
    async getPerk() {
      if (this.Perk.size === 0) {
        // 获取静态资源，失败再次获取，最多重新获取10次
        const maxRetryCount = 10;
        let retryCount = 0;
        // while (retryCount < maxRetryCount) {
        //   try {
        //     this.Perk = await _getPerkUrl();
        //     console.log("Perk静态资源获取成功");
        //     break;
        //   } catch (e) {
        //     retryCount++;
        //     if (retryCount >= maxRetryCount) {
        //       $Message("Perk静态资源获取失败！", e, "error");
        //       break;
        //     }
        //     // 重试之前等待一段时间
        //     await new Promise((resolve) => setTimeout(resolve, 1000));
        //   }
        // }
      }
      return this.Perk;
    },
  },
});
//装备
export const useItemStore = defineStore("item", {
  state: () => ({
    Item: new Map(),
  }),
  actions: {
    async getItem() {
      if (this.Item.size === 0) {
        // 获取静态资源，失败再次获取，最多重新获取10次
        const maxRetryCount = 10;
        let retryCount = 0;
        // while (retryCount < maxRetryCount) {
        //   try {
        //     this.Item = await _getItemUrl();
        //     console.log("Item静态资源获取成功");
        //     break;
        //   } catch (e) {
        //     retryCount++;
        //     if (retryCount >= maxRetryCount) {
        //       $Message("Item静态资源获取失败！", e, "error");
        //       break;
        //     }
        //     // 重试之前等待一段时间
        //     await new Promise((resolve) => setTimeout(resolve, 1000));
        //   }
        // }
      }
      return this.Item;
    },
  },
});
