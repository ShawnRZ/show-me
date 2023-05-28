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
        path: "/search?/:puuid",
        name: "searchByPuuid",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "@/views/search/components/index.vue"
          ),
        // meta: {
        //   title: "搜索",
        //   icon: "search",
        // },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
