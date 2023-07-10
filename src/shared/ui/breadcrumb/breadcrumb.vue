<script setup lang="ts">
defineProps<{
  breadcrumb?: { path?: string; title: string }[];
}>();
</script>

<template>
  <ABreadcrumb v-if="breadcrumb" class="breadcrumb">
    <ABreadcrumbItem v-for="item in breadcrumb" :key="item.title">
      <RouterLink v-if="item.path" :to="item.path">{{ item.title }}</RouterLink>
      <span v-else>{{ item.title }}</span>
    </ABreadcrumbItem>
  </ABreadcrumb>
</template>

<style lang="scss" src="./index.scss" />
