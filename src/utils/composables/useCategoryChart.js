import { ref } from "vue";
import { fetchTopCategories } from "../categoryService";
import { formatCurrency } from "../utils";

export const useCategoryChart = () => {
  const chartData = ref(null);

  const tooltipCallbacks = {
    label: function (tooltipItem) {
      const index = tooltipItem.dataIndex;
      const remainingBudget = chartData.value.datasets[0].remainingBudgets[index];
      const spent = tooltipItem.raw;
      return `Gastado: ${formatCurrency(spent)} | Restante: ${formatCurrency(
        remainingBudget
      )}`;
    },
  };

  const loadTopCategories = async () => {
    try {
      const response = await fetchTopCategories();
      const categories = response.data;

      chartData.value = {
        labels: categories.map((category) => category.name),
        datasets: [
          {
            label: "Amount Spent",
            backgroundColor: ["#f87979", "#a6c4f3", "#f3a4a6"],
            data: categories.map((category) => category.total_spent),
            remainingBudgets: categories.map(
              (category) => category.remaining_budget
            ),
          },
        ],
      };
    } catch (error) {
      console.error("Failed to fetch top categories:", error);
    }
  };

  return {
    chartData,
    tooltipCallbacks,
    loadTopCategories,
  };
};
