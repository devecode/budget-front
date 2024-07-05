import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import {
  fetchCategoriesWithSpent,
  fetchIncomeVsEgress,
  fetchPaymentMethodsWithSpending,
  fetchAccountsToPay,
} from "../dashboardService";

export const useDashboard = () => {
  const categories = ref([]);
  const totalIncome = ref(0);
  const totalEgress = ref(0);
  const paymentMethodsWithSpending = ref([]);
  const accountsToPay = ref([]);

  const $q = useQuasar();

  const loadCategories = async (params) => {
    try {
      const response = await fetchCategoriesWithSpent(params);
      categories.value = response.data;
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "No se pudieron obtener las categorías",
      });
    }
  };

  const loadIncomeVsEgress = async (params) => {
    try {
      const response = await fetchIncomeVsEgress(params);
      const data = response.data;

      totalIncome.value = parseFloat(data.total_income);
      totalEgress.value = parseFloat(data.total_egress);
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "Failed to fetch income vs egress data",
      });
    }
  };

  const loadPaymentMethodsWithSpending = async (params) => {
    try {
      const response = await fetchPaymentMethodsWithSpending(params);
      paymentMethodsWithSpending.value = response.data;
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "No se pudieron obtener los métodos de pago con gasto",
      });
    }
  };

  const loadAccountsToPay = async (params) => {
    try {
      const response = await fetchAccountsToPay(params);
      accountsToPay.value = response.data.accounts.slice(0, 5);
    } catch (error) {
      $q.notify({
        type: "negative",
        message: "No se pudieron obtener las cuentas por pagar",
      });
    }
  };

  const balance = computed(() => totalIncome.value - totalEgress.value);

  return {
    categories,
    totalIncome,
    totalEgress,
    paymentMethodsWithSpending,
    accountsToPay,
    loadCategories,
    loadIncomeVsEgress,
    loadPaymentMethodsWithSpending,
    loadAccountsToPay,
    balance,
  };
};
