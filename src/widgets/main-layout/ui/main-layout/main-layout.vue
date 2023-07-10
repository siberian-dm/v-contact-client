<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <ALayout class="main-layout">
    <ALayoutHeader class="main-layout-header"> <div class="main-layout-header__logo">vContact</div> </ALayoutHeader>
    <ALayoutContent class="main-layout-content">
      <div class="main-layout-content__box">
        <slot />
      </div>
    </ALayoutContent>
    <ALayoutFooter class="main-layout-footer">vContact ©{{ currentYear }} created by siberian-dm</ALayoutFooter>
  </ALayout>
</template>

<style lang="scss" src="./index.scss" />
