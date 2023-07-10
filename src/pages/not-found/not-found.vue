<script setup lang="ts">
import { MainLayout } from '~widgets/main-layout';
import { PAGE_PATH } from '~shared/config';
</script>

<template>
  <MainLayout>
    <AResult status="404" title="404" sub-title="Извините, страница, которую вы посетили, не существует.">
      <template #extra>
        <RouterLink :to="PAGE_PATH.contacts.root">На главную</RouterLink>
      </template>
    </AResult>
  </MainLayout>
</template>
