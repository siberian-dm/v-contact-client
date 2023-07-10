import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { vContactApi, UserDto, UserCredentials } from '~shared/api';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '~shared/config';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<UserDto | null>(null);
  const isAuth = computed(() => !!currentUser.value);
  const loading = ref(false);

  function resetStore() {
    currentUser.value = null;
  }

  function setUser(user: UserDto) {
    currentUser.value = user;
  }

  async function login(payload: UserCredentials) {
    loading.value = true;

    const response = await vContactApi.auth.login(payload);

    if (response) {
      const { user, accessToken, refreshToken } = response.data;

      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(ACCESS_TOKEN_KEY, `Bearer ${accessToken}`);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      currentUser.value = user;
      loading.value = false;
      return true;
    } else {
      loading.value = false;
      return false;
    }
  }

  async function logout() {
    resetStore();
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  return {
    currentUser,
    isAuth,
    loading,
    setUser,
    resetStore,
    login,
    logout,
  };
});
