<script setup lang="ts">
import { ContactList } from '~widgets/contact-list';
import { MainLayout } from '~widgets/main-layout';
import { PAGE_PATH, NEW_CONTACT_ID } from '~shared/lib';
</script>

<template>
  <MainLayout title="Список контактов">
    <template #actions>
      <RouterLink :to="PAGE_PATH.contacts.details(NEW_CONTACT_ID)">+ Добавить</RouterLink>
    </template>
    <ContactList />
  </MainLayout>
</template>
