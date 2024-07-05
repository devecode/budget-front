import { ref } from "vue";
import { fetchCategories, deleteCategory, fetchCategoriesWithSpent } from "../categoryService";
import { useQuasar } from "quasar";

export const useCategory = () => {
  const categories = ref([]);
  const categoriesWithSpent = ref([]);
  const $q = useQuasar();

  const loadCategories = async () => {
    try {
      const response = await fetchCategories();
      categories.value = response.data;
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to fetch categories",
      });
    }
  };

  const removeCategory = async (id) => {
    try {
      await deleteCategory(id);
      $q.notify({
        type: "positive",
        message: "Category deleted successfully",
      });
      loadCategories();
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to delete category",
      });
    }
  };

  const loadCategoriesWithSpent = async () => {
    try {
      const response = await fetchCategoriesWithSpent();
      categoriesWithSpent.value = response.data;
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to fetch categories",
      });
    }
  };

  return {
    categories,
    categoriesWithSpent,
    loadCategories,
    removeCategory,
    loadCategoriesWithSpent,
  };
};
