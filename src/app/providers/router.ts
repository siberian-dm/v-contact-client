import { NavigationGuardWithThis, createRouter, createWebHistory } from 'vue-router';

import { PAGE_PATH, USER_KEY } from '~shared/config';

export const onlyAuthMiddleware: NavigationGuardWithThis<undefined> = function (_to, _from, next) {
  const user = localStorage.getItem(USER_KEY);

  if (user) {
    return next();
  }
  next(PAGE_PATH.page403);
};

export const onlyNotAuthMiddleware: NavigationGuardWithThis<undefined> = function (_to, _from, next) {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return next();
  }
  next(PAGE_PATH.contacts.root);
};

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
      beforeEnter: [onlyAuthMiddleware],
    },
    {
      path: PAGE_PATH.signIn,
      name: 'signIn',
      component: () => import('~pages/sign-in'),
      beforeEnter: [onlyNotAuthMiddleware],
    },
    {
      path: PAGE_PATH.signUp,
      name: 'signUp',
      component: () => import('~pages/sign-up'),
      beforeEnter: [onlyNotAuthMiddleware],
    },
    { path: PAGE_PATH.page403, name: 'notAuth', component: () => import('~pages/not-auth') },
    { path: PAGE_PATH.page404, name: 'notFound', component: () => import('~pages/not-found') },
    {
      path: '/:pathMatch(.*)*',
      redirect: PAGE_PATH.page404,
    },
  ],
});
