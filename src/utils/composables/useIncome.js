import { ref } from "vue";
import { fetchIncomes, deleteIncome } from "../incomeService";
import { useQuasar } from "quasar";

export const useIncome = () => {
  const incomes = ref([]);
  const $q = useQuasar();

  const loadIncomes = async () => {
    try {
      const response = await fetchIncomes();
      incomes.value = response.data.map(income => ({
        ...income,
        frequency: income.frequency || '',
        type: income.type || ''
      }));
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to fetch incomes",
      });
    }
  };

  const removeIncome = async (id) => {
    try {
      await deleteIncome(id);
      $q.notify({
        type: "positive",
        message: "Ingreso borrado correctamente",
      });
      loadIncomes();
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to delete income",
      });
    }
  };

  return {
    incomes,
    loadIncomes,
    removeIncome,
  };
};
