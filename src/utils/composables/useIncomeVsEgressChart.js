import { ref } from 'vue';
import { fetchIncomeVsEgress } from '../incomeVsEgressService';
import { formatCurrency } from '../utils';

export const useIncomeVsEgressChart = () => {
  const chartData = ref(null);

  const tooltipCallbacks = {
    label: function (tooltipItem) {
      const spent = tooltipItem.raw;
      return `Monto total: ${formatCurrency(spent)}`;
    },
  };

  const loadIncomeVsEgress = async () => {
    try {
      const response = await fetchIncomeVsEgress();
      const data = response.data;

      chartData.value = {
        labels: ["Ingreso", "Egreso"],
        datasets: [
          {
            label: "Cantidad",
            backgroundColor: ["#4caf50", "#f44336"],
            data: [data.total_income, data.total_egress],
          },
        ],
      };
    } catch (error) {
      console.error("Failed to fetch income vs egress data:", error);
    }
  };

  return {
    chartData,
    tooltipCallbacks,
    loadIncomeVsEgress,
  };
};
