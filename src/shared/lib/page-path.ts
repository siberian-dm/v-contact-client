export const PAGE_PATH = {
  root: '/',
  signUp: '/sign-up',
  signIn: '/sign-in',
  contacts: {
    root: '/contacts',
    details: (id: number) => `/contacts/${id}`,
  },
  page404: '/404',
};
