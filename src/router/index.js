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
    component: () => import("../views/home.vue"),
  },
  {
    path: "/personalPage",
    name: "personalPage",
    component: () => import("../views/personalPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/login.vue"),
  },
  {
    path: "/registered",
    name: "registered",
    component: () => import("../components/registered.vue"),
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
