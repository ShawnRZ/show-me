import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/home/index.vue"),

    meta: {
      title: "首页",
      icon: "home",
    },
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/search/index.vue"),
    meta: {
      title: "搜索",
      icon: "search",
    },
    children: [
      {
        path: "/search?/:queryName",
        name: "queryByName",
        component: () =>
          import(
            "@/views/search/searchDetail/index.vue"
            /* "@/views/search/queryByName/index.vue",跨区查询跳转*/
          ),
      },
      // {
      //   path: "/search?/:summonerId/:platformId",
      //   name: "queryBySummoner",
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "about" */ "@/views/search/searchDetail/index.vue"
      //     ),
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
