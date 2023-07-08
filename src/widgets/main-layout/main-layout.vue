<script setup lang="ts">
defineProps<{
  title: string;
  breadcrumb?: { path?: string; title: string }[];
}>();

const currentYear = new Date().getFullYear();
</script>

<template>
  <ALayout class="main-layout">
    <ALayoutHeader class="main-layout-header"> <div class="main-layout-header__logo" /></ALayoutHeader>
    <ALayoutContent class="main-layout-content">
      <ABreadcrumb v-if="breadcrumb" class="main-layout-content__breadcrumb">
        <ABreadcrumbItem v-for="item in breadcrumb" :key="item.title">
          <RouterLink v-if="item.path" :to="item.path">{{ item.title }}</RouterLink>
          <span v-else>{{ item.title }}</span>
        </ABreadcrumbItem>
      </ABreadcrumb>
      <div class="main-layout-content__box">
        <APageHeader class="content-box-header" :title="title" />
        <slot />
      </div>
    </ALayoutContent>
    <ALayoutFooter class="main-layout-footer">vContacts ©{{ currentYear }} created by siberian-dm</ALayoutFooter>
  </ALayout>
</template>

<style lang="scss" src="./index.scss" />
