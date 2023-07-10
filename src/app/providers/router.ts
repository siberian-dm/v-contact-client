import { createRouter, createWebHistory } from 'vue-router';

import { PAGE_PATH } from '~shared/config';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: PAGE_PATH.root, name: 'root', redirect: PAGE_PATH.contacts.root },
    {
      path: PAGE_PATH.contacts.root,
      name: 'contacts',
      component: () => import('~pages/contacts'),
    },
    {
      path: `${PAGE_PATH.contacts.root}/:id`,
      name: 'contactDetails',
      component: () => import('~pages/contact-details'),
    },
    { path: PAGE_PATH.signIn, name: 'signIn', component: () => import('~pages/sign-in') },
    { path: PAGE_PATH.signUp, name: 'signUp', component: () => import('~pages/sign-up') },
  ],
});
