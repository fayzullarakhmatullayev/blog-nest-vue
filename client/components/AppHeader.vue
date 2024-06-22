<script lang="ts" setup></script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="app-header--wrapper">
        <NuxtLink to="/" class="app-header--logo">News</NuxtLink>
        <div class="app-header--btns">
          <Button icon="pi pi-sign-in" label="Login" />
          <Button @click="$router.push('/add-post')" icon="pi pi-plus" label="Add Post" />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.app-header--wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.app-header--btns {
  display: flex;
  gap: 10px;
}

.app-header--logo {
  font-size: 24px;
  font-weight: 600;
  text-decoration: none;
  color: var(--color-black);
}
</style>
