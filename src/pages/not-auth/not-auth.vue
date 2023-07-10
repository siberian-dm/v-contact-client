<script setup lang="ts">
import { MainLayout } from '~widgets/main-layout';
import { PAGE_PATH } from '~shared/config';
</script>

<template>
  <MainLayout>
    <AResult status="403" title="403" sub-title="Извините, вы не авторизованы для доступа к этой странице.">
      <template #extra>
        <RouterLink :to="PAGE_PATH.contacts.root">На главную</RouterLink>
      </template>
    </AResult>
  </MainLayout>
</template>
