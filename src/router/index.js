import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  //DASHBOARD ROUTER
  {
    path: "/",
    name: "Dashboard",
    component: () => import("./../views/dashboard/Dashboard"),
    meta: { requiresAuth: true },
  },
  {
    path: "/account-monitoring",
    name: "Account Monitoring",
    component: () =>
      import("./../views/dashboard/Account Monitoring/AccountMonitoring"),
    meta: { requiresAuth: true },
  },
  {
    path: "/engine-monitoring",
    name: "Engine Monitoring",
    component: () =>
      import("./../views/dashboard/Engine Monitoring/EngineMonitoring"),
    meta: { requiresAuth: true },
  },
  {
    path: "/user-management",
    name: "User Management",
    component: () =>
      import("./../views/dashboard/User Monitoring/UserMonitoring"),
    meta: { requiresLevelZero: true, requiresAuth: true },
  },
  {
    path: "/percolator",
    name: "Percolator",
    component: () => import("./../views/dashboard/Percolator/PercolatorNew"),
    meta: { requiresAuth: true },
  },
  {
    path: "/percolator/:id",
    name: "PercolatorDetail",
    props: true,
    component: () => import("./../views/dashboard/Percolator/Detail"),
    meta: { requiresAuth: true },
  },
  {
    path: "/alert",
    name: "Alert",
    props: true,
    component: () => import("./../views/dashboard/Alert/Alert"),
    meta: { requiresAuth: true },
  },
  {
    path: "/document",
    name: "Document",
    props: true,
    component: () => import("./../views/dashboard/Document/Document"),
    meta: { requiresAuth: true },
  },

  // HEADER ROUTER
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../components/Header/Profile"),
    meta: { requiresAuth: true },
  },

  // AUTH ROUTER
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login"),
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: () => import("../views/auth/Register"),
  // },

  // NOT FOUND ROUTER
  {
    path: "*",
    name: "NotFound",
    component: () => import("../views/NotFound"),
    meta: { requiresAuth: true },
  },

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const UserLevel = getUserLevel();
  if (to.meta.requiresLevelZero && UserLevel !== "0") {
    next({ path: "/" });
  } else {
    next(); // Lanjutkan navigasi
  }
});

function getUserLevel() {
  return localStorage.getItem("level");
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");
    if (!token) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
