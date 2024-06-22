<template>
  <MainCategoriesTab>
    <div class="main-wrapper">
      <MainPostCard v-for="i in 10" :key="i" />
    </div>
  </MainCategoriesTab>
</template>

<script setup></script>

<style lang="scss">
.main-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
