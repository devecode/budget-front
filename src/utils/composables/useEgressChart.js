import { ref } from 'vue';
import { fetchEgresses } from '../egressService';
import { formatCurrency } from '../utils';

export const useEgressChart = () => {
  const chartData = ref(null);

  const tooltipCallbacks = {
    label: function (tooltipItem) {
      const spent = tooltipItem.raw;
      return `Monto total: ${formatCurrency(spent)}`;
    },
  };

  const loadEgresses = async () => {
    try {
      const response = await fetchEgresses();
      const egresses = response.data;

      chartData.value = {
        labels: egresses.map((e) => e.name),
        datasets: [
          {
            label: "Gastos",
            backgroundColor: "#42A5F5",
            data: egresses.map((e) => parseFloat(e.amount)),
          },
        ],
      };
    } catch (error) {
      console.error("Failed to fetch egresses", error);
    }
  };

  return {
    chartData,
    tooltipCallbacks,
    loadEgresses,
  };
};
