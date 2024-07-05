import { ref, watch } from "vue";
import { createCategory, updateCategory } from "../categoryService";
import { useQuasar } from "quasar";

export const useCategoryForm = (initialData, emit) => {
  const name = ref("");
  const limitSpending = ref(0);
  const isEditMode = ref(false);
  const $q = useQuasar();

  const resetForm = () => {
    name.value = "";
    limitSpending.value = 0;
  };

  watch(
    () => initialData,
    (newVal) => {
      if (newVal) {
        name.value = newVal.name;
        limitSpending.value = newVal.limit_spending;
        isEditMode.value = true;
      } else {
        resetForm();
        isEditMode.value = false;
      }
    },
    { immediate: true }
  );

  const saveCategory = async () => {
    try {
      if (isEditMode.value && initialData) {
        await updateCategory(initialData.id, {
          name: name.value,
          limit_spending: limitSpending.value,
        });
        $q.notify({
          type: "positive",
          message: "Categoría actualizada con éxito",
        });
      } else {
        await createCategory({
          name: name.value,
          limit_spending: limitSpending.value,
        });
        $q.notify({
          type: "positive",
          message: "Categoría creada con éxito",
        });
      }
      emit("success");
      resetForm();
    } catch (error) {
      $q.notify({
        type: "negative",
        message: `No se pudo ${isEditMode.value ? "actualizar" : "crear"} la categoría`,
      });
    }
  };

  return {
    name,
    limitSpending,
    isEditMode,
    saveCategory,
  };
};
