<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

import { FullTextSearhFilter } from '~features/full-text-searh-filter';
import { PaginationWithQuery } from '~features/pagination';
import { useContactsStore } from '~entities/contact';
import { ContactDto } from '~shared/api';
import { PAGE_PATH, NEW_CONTACT_ID } from '~shared/config';
import { PageHeader } from '~shared/ui';

const store = useContactsStore();
const { data, total, loading, queryParams } = storeToRefs(store);

watch(
  () => queryParams.value,
  () => {
    store.getContactList(queryParams.value);
  },
  { deep: true }
);
</script>

<template>
  <PageHeader title="Список контактов">
    <template #actions>
      <FullTextSearhFilter :set-query="store.setQueryWithResetPage" :loading="loading" />
      <RouterLink class="router-link" :to="PAGE_PATH.contacts.details(NEW_CONTACT_ID)">+ Добавить</RouterLink>
    </template>
  </PageHeader>
  <AList class="contact-list" size="large" :data-source="data" :loading="loading">
    <template #renderItem="{ item }: { item: ContactDto }">
      <AListItem>
        <AListItemMeta :title="item.fullName">
          <template #avatar><AAvatar :src="item.avatar" /></template>
          <template #description>
            <div>
              E-mail адрес: <a type="link" :href="`mailto:${item.email}`">{{ item.email }}</a>
            </div>
            <div>
              Номер телефона: <a type="link" :href="`tel:${item.phone}`">{{ item.phone }}</a>
            </div>
          </template>
        </AListItemMeta>
        <ATag color="purple" v-for="tag in item.tags" :key="tag">{{ tag }}</ATag>
        <template #actions>
          <RouterLink
            :to="{
              path: PAGE_PATH.contacts.details(item.id),
            }"
            >Редактировать</RouterLink
          >
        </template>
      </AListItem>
    </template>
  </AList>
  <PaginationWithQuery :total="total" :set-query="store.setQuery" :current-query="queryParams" :loading="loading" />
</template>

<style lang="scss" src="./index.scss" />
