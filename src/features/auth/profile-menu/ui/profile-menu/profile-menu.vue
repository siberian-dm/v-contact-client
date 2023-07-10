<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '~entities/auth';
import { PAGE_PATH } from '~shared/config';

const store = useAuthStore();
const { currentUser, isAuth } = storeToRefs(store);

const visible = ref(false);
const handleMenuClick: MenuProps['onClick'] = (e) => {
  if (e.key === '1') {
    store.logout();
    router.push(PAGE_PATH.contacts.root);
    visible.value = false;
  }
};

const router = useRouter();

const handleProfileClick = () => {
  if (!isAuth.value) {
    router.push(PAGE_PATH.signIn);
  }
};
</script>

<template>
  <ADropdown v-model:visible="visible">
    <a class="profile-menu-link" @click.prevent="handleProfileClick">
      {{ currentUser?.name ? currentUser?.name : 'Войти' }}
      <DownOutlined v-if="isAuth" />
    </a>
    <template v-if="isAuth" #overlay>
      <AMenu @click="handleMenuClick">
        <AMenuItem key="1">Выход</AMenuItem>
      </AMenu>
    </template>
  </ADropdown>
</template>

<style lang="scss" src="./index.scss" />
