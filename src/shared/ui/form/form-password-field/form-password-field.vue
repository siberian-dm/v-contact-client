<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{
  fieldName: string;
  label?: string;
}>();

const { value, errorMessage } = useField<string | number | undefined>(() => props.fieldName);
</script>

<template>
  <AFormItem :label="label" :help="errorMessage" :validate-status="errorMessage ? 'error' : ''">
    <AInputPassword v-model:value="value" />
  </AFormItem>
</template>
