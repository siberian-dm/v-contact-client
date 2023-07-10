<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <APageHeader class="page-header" :title="title">
    <template #extra>
      <slot name="actions" />
    </template>
  </APageHeader>
</template>

<style lang="scss" src="./index.scss" />
