import { auth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index.vue"),
    meta: {
      layout: 'AppLayoutMain' 
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      middlewares: [isLoggedIn],
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "AppLayoutProfile",
      middlewares: [auth],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: "AppLayoutProfile",
      middlewares: [auth],
    },
  },
];