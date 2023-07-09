<script setup lang="ts">
import { Form as FormContext } from 'vee-validate';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { ContactForm } from '~widgets/contact-form';
import { MainLayout } from '~widgets/main-layout';
import { useContactsStore } from '~entities/contact';
import { ContactDto } from '~shared/api';
import { NEW_CONTACT_ID, PAGE_PATH } from '~shared/lib';

const route = useRoute();

const contactId = route.params['id'] as string | undefined;
const isNewContact = computed(() => contactId && contactId === NEW_CONTACT_ID);
const pageTitle = computed(() => (isNewContact.value ? 'Добавление контакта' : 'Редактирование контакта'));

const store = useContactsStore();

const currentContact = ref<ContactDto | null | undefined>(null);

const breadcrumb = computed(() => [
  { path: PAGE_PATH.contacts.root, title: 'Список контактов' },
  { title: isNewContact.value ? 'Новый контакт' : currentContact.value?.fullName ?? '' },
]);

onMounted(async () => {
  if (contactId && !isNewContact.value) {
    const contact = await store.getContact(Number(contactId));
    currentContact.value = contact ?? null;
  }
});
</script>

<template>
  <MainLayout :title="pageTitle" :breadcrumb="breadcrumb">
    <FormContext class="contact-form">
      <ContactForm :data="currentContact" />
    </FormContext>
  </MainLayout>
</template>

<style lang="scss" src="./index.scss" />
