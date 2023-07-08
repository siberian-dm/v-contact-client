import { createRouter, createWebHistory } from 'vue-router';

import { PAGE_PATH } from '~shared/lib';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: PAGE_PATH.root, redirect: PAGE_PATH.contacts.root },
    {
      path: PAGE_PATH.contacts.root,
      component: () => import('~pages/contacts'),
    },
    { path: `${PAGE_PATH.contacts.root}/:id`, component: () => import('~pages/contact-details') },
    { path: PAGE_PATH.signIn, component: () => import('~pages/sign-in') },
    { path: PAGE_PATH.signUp, component: () => import('~pages/sign-up') },
  ],
});
