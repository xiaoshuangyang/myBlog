import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
const history = createWebHistory();
const hash = createWebHashHistory();
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home.vue"), //.vue不可省略
  },
  {
    path: "/detail/:id?",
    name: "detail",
    component: () => import("../components/detail.vue"), //.vue不可省略
  },
];

const router = createRouter({
  routes,
  history: hash,
});

export default router;
