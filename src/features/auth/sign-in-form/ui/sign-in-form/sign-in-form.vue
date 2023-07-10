<script setup lang="ts">
import { Form as FormContext } from 'vee-validate';

import { FormContent } from '../form-content';
</script>

<template>
  <FormContext class="sign-in-form">
    <FormContent />
  </FormContext>
</template>

<style lang="scss" src="./index.scss" />
