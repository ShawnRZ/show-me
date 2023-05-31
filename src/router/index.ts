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
    children: [
      {
        path: "/home?/:puuid",
        name: "currentPuuid",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/home/home/index.vue"),
      },
    ],
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
            /* webpackChunkName: "about" */ "@/views/search/components/index.vue"
          ),
      },
      // {
      //   path: "/search?/:puuid",
      //   name: "queryPuuid",
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "about" */ "@/views/search/queryPuuid/index.vue"
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
