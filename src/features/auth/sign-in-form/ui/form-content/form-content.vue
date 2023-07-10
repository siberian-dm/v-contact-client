<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { object, string } from 'yup';

import { useAuthStore } from '~entities/auth';
import { UserCredentials } from '~shared/api';
import { PAGE_PATH } from '~shared/config';
import { SpinBox } from '~shared/ui';
import { FormTextField, FormActionsBox } from '~shared/ui/form';

const store = useAuthStore();
const { loading } = storeToRefs(store);

const validationSchema = object().shape({
  email: string().email('Некорректный email').required('Обязательное поле'),
  password: string().required('Обязательное поле'),
});

const {
  handleSubmit: submit,
  meta,
  isSubmitting,
} = useForm<UserCredentials>({
  initialValues: {},
  validationSchema,
});

const submitDisabled = computed(() => !meta.value.dirty || isSubmitting.value || loading.value);

const router = useRouter();

const handleSubmit = submit(
  async (values) => {
    const result = await store.login(values);
    if (result) {
      router.push(PAGE_PATH.contacts.root);
    }
  },
  (ctx) => {
    // eslint-disable-next-line no-console
    console.log('invalid submit', ctx.errors);
  }
);
</script>

<template>
  <AForm layout="vertical" style="position: relative">
    <FormTextField field-name="email" label="E-mail адрес" />
    <FormTextField field-name="password" label="Пароль" />
    <SpinBox v-if="loading" style="position: absolute" />
  </AForm>
  <FormActionsBox>
    <AButton type="primary" :disabled="submitDisabled" @click="handleSubmit">Войти</AButton>
  </FormActionsBox>
</template>

<style lang="scss" src="./index.scss" />
