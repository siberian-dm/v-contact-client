<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { computed, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { object, string } from 'yup';
import { useContactCrudStore } from '~entities/contact';

import { ContactDto } from '~shared/api';
import { PAGE_PATH } from '~shared/config';
import { SpinBox } from '~shared/ui';
import { FormTextField, FormActionsBox } from '~shared/ui/form';

const store = useContactCrudStore();
const { loading, editMod, currrentEntity } = storeToRefs(store);

const validationSchema = object().shape({
  fullName: string().required('Обязательное поле'),
  phone: string().required('Обязательное поле'),
  email: string().email('Некорректный email').required('Обязательное поле'),
});

const {
  handleSubmit: submit,
  meta,
  isSubmitting,
  setValues,
} = useForm<ContactDto>({
  initialValues: {},
  validationSchema,
});

const submitDisabled = computed(() => !meta.value.dirty || isSubmitting.value || loading.value);
const deleteDisabled = computed(() => isSubmitting.value || loading.value);

const router = useRouter();

const handleSubmit = submit(
  async (values) => {
    if (editMod.value) {
      await store.updateContact(values);
    } else {
      await store.createContact(values);
    }
    router.push(PAGE_PATH.contacts.root);
  },
  (ctx) => {
    // eslint-disable-next-line no-console
    console.log('invalid submit', ctx.errors);
  }
);

const handleDelete = async () => {
  if (currrentEntity.value?.id) {
    await store.deleteContact(Number(currrentEntity?.value?.id));
    router.push(PAGE_PATH.contacts.root);
  }
};

watch(
  () => editMod.value,
  async (value) => {
    if (value) {
      setValues(currrentEntity.value ?? {});
    }
  },
  { deep: true, immediate: true }
);

onUnmounted(store.resetStore);
</script>

<template>
  <AForm layout="vertical" style="position: relative">
    <FormTextField field-name="fullName" label="ФИО" />
    <FormTextField field-name="phone" label="Номер телефона" />
    <FormTextField field-name="email" label="E-mail адрес" />
    <SpinBox v-if="loading" style="position: absolute" />
  </AForm>
  <FormActionsBox>
    <APopconfirm
      title="Подтвердите удаление"
      ok-text="Да"
      cancel-text="Нет"
      :disabled="deleteDisabled"
      @confirm="handleDelete">
      <AButton v-show="editMod" danger :disabled="deleteDisabled">Удалить</AButton>
    </APopconfirm>
    <AButton type="primary" :disabled="submitDisabled" @click="handleSubmit">Сохранить</AButton>
  </FormActionsBox>
</template>

<style lang="scss" src="./index.scss" />
