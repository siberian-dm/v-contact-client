<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Form as FormContext } from 'vee-validate';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { ContactForm } from '~features/contact';
import { useContactCrudStore } from '~entities/contact';
import { NEW_CONTACT_ID, PAGE_PATH } from '~shared/config';
import { Breadcrumb } from '~shared/ui';
import { PageHeader } from '~shared/ui';

const route = useRoute();
const store = useContactCrudStore();
const { editMod, currrentEntity } = storeToRefs(store);

const contactId = route.params['id'] as string;
const pageTitle = computed(() => (editMod.value ? 'Редактирование контакта' : 'Добавление контакта'));

const breadcrumb = computed(() => [
  { path: PAGE_PATH.contacts.root, title: 'Список контактов' },
  { title: currrentEntity.value?.fullName ? currrentEntity.value.fullName : 'Новый контакт' },
]);

onMounted(async () => {
  if (contactId && contactId !== NEW_CONTACT_ID) {
    store.getContact(Number(contactId));
  }
});
</script>

<template>
  <Breadcrumb :breadcrumb="breadcrumb" />
  <PageHeader :title="pageTitle" />
  <FormContext class="contact-form">
    <ContactForm />
  </FormContext>
</template>

<style lang="scss" src="./index.scss" />
