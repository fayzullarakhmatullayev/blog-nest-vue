<script lang="ts" setup></script>

<template>
  <aside class="app-sidebar">
    <h2 class="app-sidebar--title">Similar Posts</h2>
    <div class="app-sidebar--wrapper">
      <SidebarPostCard v-for="i in 10" :key="i" />
    </div>
  </aside>
</template>
