import { createRouter, createWebHistory } from "vue-router"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/contacts" },
    {
      path: "/contacts",
      component: () => import("~pages/contacts"),
    },
    { path: "/contacts/:id", component: () => import("~pages/contact-details") },
    { path: "/sign-in", component: () => import("~pages/sign-in") },
    { path: "/sign-up", component: () => import("~pages/sign-up") },
  ],
})
