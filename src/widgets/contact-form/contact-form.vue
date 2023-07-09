<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { object, string } from 'yup';
import { useContactsStore } from '~entities/contact';

import { ContactDto } from '~shared/api';
import { PAGE_PATH } from '~shared/lib';
import { SpinBox } from '~shared/ui';
import { FormTextField, FormActionsBox } from '~shared/ui/form';

const props = defineProps<{ data?: ContactDto | null }>();

const isNewContact = computed(() => !props.data);

const store = useContactsStore();
const { loading } = storeToRefs(store);

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

const submitDisabled = computed(() => !meta.value.dirty || isSubmitting.value || loading.value.item);
const deleteDisabled = computed(() => isSubmitting.value || loading.value.item);

const handleSubmit = submit(
  async (values) => {
    if (isNewContact.value) {
      await store.createContact(values);
      router.push(PAGE_PATH.contacts.root);
    } else {
      const result = await store.updateContact(values);
      setValues(result);
    }
  },
  (ctx) => {
    // eslint-disable-next-line no-console
    console.log('invalid submit', ctx.errors);
  }
);

const router = useRouter();
const handleDelete = async () => {
  if (props.data?.id) {
    await store.deleteContact(props.data?.id);
    router.push(PAGE_PATH.contacts.root);
  }
};

watch(
  () => props.data,
  (value) => {
    if (value?.id) {
      setValues(value);
    }
  },
  { deep: true }
);
</script>

<template>
  <AForm layout="vertical" style="position: relative">
    <FormTextField field-name="fullName" label="ФИО" />
    <FormTextField field-name="phone" label="Номер телефона" />
    <FormTextField field-name="email" label="E-mail адрес" />
    <SpinBox v-if="loading.item" style="position: absolute" />
  </AForm>
  <FormActionsBox>
    <APopconfirm
      title="Подтвердите удаление"
      ok-text="Да"
      cancel-text="Нет"
      :disabled="deleteDisabled"
      @confirm="handleDelete">
      <AButton v-show="!isNewContact" danger :disabled="deleteDisabled">Удалить</AButton>
    </APopconfirm>
    <AButton type="primary" :disabled="submitDisabled" @click="handleSubmit">Сохранить</AButton>
  </FormActionsBox>
</template>

<style lang="scss" src="./index.scss" />
