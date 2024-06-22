<template>
  <TabView :scrollable="true" value="0">
    <TabPanel key="all" header="All">
      <slot />
    </TabPanel>
    <TabPanel v-for="category in categories" :key="category.id" :header="category.name">
      <slot />
    </TabPanel>
  </TabView>
</template>

<script lang="ts" setup>
import { categoryService } from '~/services/category.service';

const { getAllCategories } = categoryService();
const categories = await getAllCategories();
</script>
