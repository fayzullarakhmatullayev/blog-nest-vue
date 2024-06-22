import { defineStore } from 'pinia';
import type { CategoryModel } from '~/models/category.model';
import { categoryService } from '~/services/category.service';

export const useCategoriesStore = defineStore('categories', () => {
  const { getAllCategories } = categoryService();

  const categories = ref<CategoryModel[]>([]);

  const getCategories = async () => {
    try {
      const response = await getAllCategories();
      categories.value = response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    categories,
    getCategories
  };
});
