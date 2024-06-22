import type { CategoryModel } from '~/models/category.model';

export const categoryService = () => {
  const { $fetchApi } = useCustomFetch();

  const getAllCategories = async (): Promise<CategoryModel[]> => {
    return $fetchApi<CategoryModel[]>('/category');
  };

  return { getAllCategories };
};
