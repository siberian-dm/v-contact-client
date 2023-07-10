<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';

import { useAuthStore } from '~entities/auth';
import { USER_KEY } from '~shared/config';

const store = useAuthStore();

onBeforeMount(() => {
  const user = localStorage.getItem(USER_KEY);

  if (user) {
    store.setUser(JSON.parse(user));
  }
});
</script>

<template>
  <RouterView />
</template>
