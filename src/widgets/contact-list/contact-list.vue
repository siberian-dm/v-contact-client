<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import { useContactsStore } from '~entities/contact';
import { ContactDto } from '~shared/api';
import { PAGE_PATH } from '~shared/lib';

const store = useContactsStore();
const { data, loading } = storeToRefs(store);

onMounted(() => {
  store.getContactList();
});
</script>

<template>
  <AList class="contact-list" size="large" :data-source="data" :loading="loading.list">
    <template #renderItem="{ item }: { item: ContactDto }">
      <AListItem>
        <AListItemMeta :title="item.fullName">
          <template #avatar><AAvatar :src="item.avatar" /></template>
          <template #description>
            E-mail адрес: <AButton type="link" :href="`mailto:${item.email}`">{{ item.email }}</AButton> Номер телефона:
            <AButton type="link" :href="`tel:${item.phone}`">{{ item.phone }}</AButton>
          </template>
        </AListItemMeta>
        <ATag color="purple" v-for="tag in item.tags" :key="tag">{{ tag }}</ATag>
        <template #actions>
          <RouterLink :to="PAGE_PATH.contacts.details(item.id)">Редактировать</RouterLink>
        </template>
      </AListItem>
    </template>
  </AList>
</template>

<style lang="scss" src="./index.scss" />
