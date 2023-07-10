<script setup lang="ts">
import { MainLayout } from '~widgets/main-layout';
import { SignInForm } from '~features/auth/sign-in-form';
import { PageHeader } from '~shared/ui';
</script>

<template>
  <MainLayout>
    <PageHeader title="Авторизация" />
    <SignInForm />
  </MainLayout>
</template>
