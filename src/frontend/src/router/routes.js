import { auth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/",
    name: "IndexPage",
    component: () => import("../views/IndexPage.vue"),
    meta: {
      layout: 'AppLayoutMain' 
    },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("../views/LoginPage.vue"),
    meta: {
      middlewares: [isLoggedIn],
    },
  },
  {
    path: "/cart",
    name: "CartPage",
    component: () => import("../views/CartPage.vue"),
  },
  {
    path: "/orders",
    name: "OrdersPage",
    component: () => import("../views/OrdersPage.vue"),
    meta: {
      layout: "AppLayoutProfile",
      middlewares: [auth],
    },
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: () => import("../views/ProfilePage.vue"),
    meta: {
      layout: "AppLayoutProfile",
      middlewares: [auth],
    },
  },
];