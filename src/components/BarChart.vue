<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ref, watch, computed } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tooltipCallbacks: {
    type: Object,
    default: () => ({
      label: (tooltipItem) => {
        const spent = tooltipItem.raw;
        return `Gastado: ${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(spent)}`;
      },
    }),
  },
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: props.title,
    },
    tooltip: {
      callbacks: props.tooltipCallbacks,
    },
  },
}));
</script>
