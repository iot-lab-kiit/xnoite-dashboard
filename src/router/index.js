import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/UserProfile.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Stock from "../views/Stocks.vue";
import News from "../views/News.vue";
import Crypto from "../views/Crypto.vue";
import store from '../store/index'

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
      },
      {
        path: "/stock",
        name: "stock",
        components: { default: Stock },
      },
      {
        path: "/crypto",
        name: "crypto",
        components: { default: Crypto },
      },
      {
        path: "/news",
        name: "news",
        components: { default: News },
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  if (store.state.token === "" && to.fullPath !== "/login" && to.fullPath !== "/register") {
    next('/login')
  } else next();
});

export default router;
